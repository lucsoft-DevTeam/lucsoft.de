import { createLocalStorageProvider, EventTypes, HmSYSConnector } from "https://deno.land/x/hmsys_connector@v0.5.2/mod.ts";
import { Button, ButtonStyle, Card, Color, Component, Horizontal, PlainText, Spacer, SupportedThemes, Vertical, View, WebGen, headless, Grid } from "https://deno.land/x/webgen@v2.0.0-beta.2/mod.ts";
import '../assets/login.css';
type ProfileData = {
    accountType: string;
    groupes: string[];
    profile: {
        email: string;
        calledAfter: string;
        permissions: [];
        username: string;
    };
};

WebGen({ theme: SupportedThemes.light })

function navigationMenu(state: Partial<{ profile: ProfileData; }>): Component {
    return Vertical(
        PlainText("HmSYS")
            .addClass("title"),
        PlainText(`@${state.profile?.profile.username}`)
            .addClass("subtitle"),
        Button("Home")
            .setColor(Color.Critical)
            .setStyle(ButtonStyle.Normal),
        Button("Services")
            .setColor(Color.Critical)
            .setStyle(ButtonStyle.Secondary),
        Button("Security")
            .setColor(Color.Critical)
            .setStyle(ButtonStyle.Secondary),
        Button("Administration")
            .setColor(Color.Critical)
            .setStyle(ButtonStyle.Secondary)
    ).setGap("1rem").setMargin("2.9rem 3rem 2.9rem 3.5rem").addClass("sidebar");
}
const network = new HmSYSConnector("localhost:5001", {
    store: createLocalStorageProvider(),
    AllowNonHTTPSConnection: true
})

network.rawOn(EventTypes.LoginFailed, () => location.href = "login.html")
network.rawOn(EventTypes.CredentialsRequired, () => location.href = "login.html")
network.rawOn(EventTypes.LoginSuccessful, () => {
    const controller = View<{ profile: ProfileData }>(({ state }) => Horizontal(
        navigationMenu(state),
        Grid(
            SmallCard("0.12", "Load Average"),
            SmallCard("0", "Active Users"),
            SmallCard("12m", "Uptime"),
        )
            .addClass("grid")
            .setGap("1.2rem")
            .setEvenColumns(5, "9.2rem"),
        Spacer(),
    )).appendOn(document.body);
    network.api.requestUserData("profile", "services", "groupe", "hmsys")
        .then(x => controller.unsafeViewOptions().update({ profile: (x as any).userData }));
})
network.rawOn(EventTypes.RawMessage, (data) => console.log(data.data))
network.ready();

function SmallCard(text: string, description: string): Component {
    return Card(headless(Vertical(
        Horizontal(
            PlainText(text).addClass("font-big"),
            Spacer()
        ).setMargin("1.2rem 1rem 0.2rem"),
        Horizontal(
            PlainText(description).addClass("font-middle"),
            Spacer()
        ).setMargin("0 1rem"),
        Spacer()
    )));
}
