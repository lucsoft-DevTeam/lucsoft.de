import { WebGen, Dialog, img, loadingWheel, Custom, Form, Vertical, Horizontal, PlainText, Input, Spacer, SupportedThemes } from "https://deno.land/x/webgen@v2.0.0-beta.1/mod.ts";
import { HmSYSConnector, EventTypes, createLocalStorageProvider } from "https://deno.land/x/hmsys_connector@v0.5.2/mod.ts";
import hmsys from "../../assets/hmsys.png";
import '../../assets/login.css';

WebGen({ theme: SupportedThemes.light })

const network = new HmSYSConnector("localhost:5001", {
    store: createLocalStorageProvider(),
    AllowNonHTTPSConnection: true
})
const LoginDialogContent = Vertical(
    Horizontal(
        Custom(img(hmsys)),
        Spacer()
    ),
    PlainText("Sign In", "h1"),
    Form({
        email: Input({
            placeholder: "E-Mail",
            type: "email"
        }),
        password: Input({
            placeholder: "Password",
            type: "password"
        })
    }).onSubmit("Next", (data) => {
        if (network.ready()) {
            network.authorize(data.get("email") as string, data.get("password") as string);
        } else
            location.reload();
    }).addClass("form")
);

const dialog = Dialog<{ type: 'login' | 'loading' | 'loggedIn' }>(({ state, update }) => {
    if (state.type === "login")
        return LoginDialogContent
    else if (state.type === "loggedIn") {
        dialog.close()
        location.href = "/hmsys.html"
    }
    else {
        network.rawOn(EventTypes.LoginFailed, () => update({ type: "login" }))
        network.rawOn(EventTypes.CredentialsRequired, () => update({ type: "login" }))
        network.rawOn(EventTypes.LoginSuccessful, () => {
            update({ type: "loggedIn" })
        })
        network.rawOn(EventTypes.RawMessage, (data) => console.log(data.data))
        network.ready();
        return Vertical(
            Custom(loadingWheel() as Element as HTMLElement),
            Spacer(),
            Spacer(),
            Spacer(),
            PlainText("Connecting to HmSYS"),
            Spacer(),
        ).addClass("connecting", "loading")
    }
}).open()