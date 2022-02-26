import { createLocalStorageProvider, EventTypes, HmResponse, HmSYSConnector } from "https://deno.land/x/hmsys_connector@v0.6.0/mod.ts";
import { Card, Component, Horizontal, PlainText, Spacer, Icon, SupportedThemes, Vertical, View, WebGen, headless, Grid, BootstrapIcons } from "https://deno.land/x/webgen@v2.0.0-beta.2/mod.ts";
import '../../assets/login.css';
import { NavigationMenu } from "./navigation.ts";
import { ProfileData } from "./types.ts";
WebGen({ theme: SupportedThemes.light, icon: new BootstrapIcons() })
const systemMonitor: HmResponse[] = [];
const network = new HmSYSConnector("localhost:5001", {
    store: createLocalStorageProvider(),
    AllowNonHTTPSConnection: true
})

const mapping: { [ type in HmResponse[ "type" ] ]: Component } = {
    client: Icon("lightning-charge-fill"),
    profile: Icon("person-badge"),
    query: Icon("search"),
    sync: Icon("info-lg")
}
const controller = View<{ profile: ProfileData }>(({ state }) => Horizontal(
    NavigationMenu(state),
    Grid(
        SmallCard("0.12", "Load Average"),
        SmallCard("0", "Active Users"),
        SmallCard("12m", "Uptime"),
        [
            { width: 4, heigth: 3 },
            Card(headless(Vertical(
                Horizontal(
                    PlainText("System-Events Monitor")
                        .setFont(0.88, 500),
                    Spacer()
                ).setMargin("1rem 1rem"),
                ...systemMonitor.map(x => Horizontal(
                    mapping[ x.type ] ?? Icon("activity"),
                    PlainText(JSON.stringify(x).substring(0, 100))
                        .setFont(0.8, 400),
                    Spacer()
                ).setGap("0.4rem").addClass("align-center-text").setMargin("0 1rem")),
                Spacer()
            )))
        ],
        Spacer(),
        Spacer(),
        Spacer(),
        SmallCard("0", "Warnings"),
        SmallCard("0", "Errors")
    )
        .addClass("grid")
        .setGap("1.2rem")
        .setEvenColumns(5, "9.2rem"),
    Spacer(),
))
network.rawOn(EventTypes.LoginFailed, () => location.href = "login.html")
network.rawOn(EventTypes.CredentialsRequired, () => location.href = "login.html")
network.rawOn(EventTypes.LoginSuccessful, () => {
    controller.appendOn(document.body);
    network.api.requestUserData("profile", "services", "groupe", "hmsys")
        .then(x => controller.unsafeViewOptions().update({ profile: (x as { userData: ProfileData }).userData }));
})
network.rawOn(EventTypes.RawMessage, ({ data }) => {
    if (data) systemMonitor.push(data)
})
network.ready();

function SmallCard(text: string, description: string): Component {
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
