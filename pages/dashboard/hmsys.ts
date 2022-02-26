import { createLocalStorageProvider, EventTypes, HmSYSConnector } from "https://deno.land/x/hmsys_connector@v0.6.0/mod.ts";
import { Card, Component, Horizontal, PlainText, Spacer, SupportedThemes, Vertical, WebGen, headless, BootstrapIcons } from "https://deno.land/x/webgen@2.0.0-beta.8/mod.ts";
import '../../assets/login.css';
import { controller } from "./controller.ts";
import { refresh } from "./stats.ts";
import { SystemView } from "./sysmonitor.ts";
import { ProfileData } from "./types.ts";
WebGen({ theme: SupportedThemes.light, icon: new BootstrapIcons() })
const network = new HmSYSConnector("localhost:5001", {
    store: createLocalStorageProvider(),
    AllowNonHTTPSConnection: true
})

network.rawOn(EventTypes.LoginFailed, () => location.href = "login.html")
network.rawOn(EventTypes.CredentialsRequired, () => location.href = "login.html")
network.rawOn(EventTypes.LoginSuccessful, () => {
    controller.appendOn(document.body);
    refresh();
    network.api.requestUserData("profile", "services", "groupe", "hmsys")
        .then(x => controller.unsafeViewOptions().update({ profile: (x as { userData: ProfileData }).userData }));
})
network.rawOn(EventTypes.RawMessage, ({ data }) => {
    const view = SystemView.unsafeViewOptions();
    if (data) view.update({
        data: [ ...(view.state.data ?? []), data ]
    })
})
network.ready();

export function SmallCard(text = "--", description: string): Component {
    return Card(headless(Vertical(
        Horizontal(
            PlainText(text)
                .setFont(2.3, 900)
                .addClass("font-big"),
            Spacer()
        ).setMargin("1.2rem 1rem 0.2rem"),
        Horizontal(
            PlainText(description)
                .setFont(0.88, 500),
            Spacer()
        ).setMargin("0 1rem"),
        Spacer()
    )));
}
