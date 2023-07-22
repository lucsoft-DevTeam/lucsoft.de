import { createLocalStorageProvider, EventTypes, HmResponse, HmSYSConnector } from "https://deno.land/x/hmsys_connector@0.9.0/mod.ts";
import { Custom, Dialog, Horizontal, img, Label, loadingWheel, Spacer, SupportedThemes, Vertical, WebGen } from "webgen/mod.ts";
import hmsys from "../../assets/hmsys.webp";
import '../../assets/login.css';
import { controller } from "./controller.ts";
import { refresh } from "./stats.ts";
import { SystemView } from "./sysmonitor.ts";
import { ProfileData } from "./types.ts";

WebGen({ theme: SupportedThemes.light });

export const network = new HmSYSConnector(location.hostname == "localhost" ? "localhost:5001" : "hmsys.de", {
    store: createLocalStorageProvider(),
    AllowNonHTTPSConnection: location.hostname == "localhost"
});
const LoginDialogContent = Vertical(
    Horizontal(
        Custom(img(hmsys)),
        Spacer()
    ),
    Label("Sign In", "h1"),
    // Form({
    //     email: TextInput("email", "Email"),
    //     password: TextInput("password", "Password")
    // }).onSubmit("Next", async (data) => {
    //     await network.ready();
    //     network.authorize(data.get("email") as string, data.get("password") as string);
    //     location.reload();
    // }).addClass("form")
);
const dialog = Dialog<{ type: 'login' | 'loading' | 'loggedIn'; }>(({ state }) => {
    if (state.type === "login")
        return LoginDialogContent;
    else if (state.type === "loggedIn") {
        dialog.close();
        controller.appendOn(document.body);
        refresh(network);
        network.api.requestUserData("profile", "services", "groupe", "hmsys")
            .then(x => controller.viewOptions().update({ profile: (x as { userData: ProfileData; }).userData }));
    }
    else {
        return Vertical(
            Custom(loadingWheel() as Element as HTMLElement),
            Spacer(),
            Spacer(),
            Spacer(),
            Label("Connecting to HmSYS"),
            Spacer(),
        ).addClass("connecting", "loading");
    }
}).open();
network.rawOn(EventTypes.Disconnected, () => dialog.open().viewOptions().update({ type: undefined }));
network.rawOn(EventTypes.LoginFailed, () => dialog.viewOptions().update({ type: "login" }));
network.rawOn(EventTypes.CredentialsRequired, () => dialog.viewOptions().update({ type: "login" }));
network.rawOn(EventTypes.LoginSuccessful, () => {
    dialog.viewOptions().update({ type: "loggedIn" });
});
network.rawOn(EventTypes.RawMessage, ({ data }) => {
    const view = SystemView.viewOptions();
    if (data) view.update({
        data: [ ...(view.state.data ?? [] as HmResponse[]), data ]
    });
});
network.ready();