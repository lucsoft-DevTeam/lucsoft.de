import {
    BootstrapIcons,
    Button,
    ButtonStyle,
    createElement,
    Custom,
    Horizontal,
    IconButton,
    img,
    PlainText,
    Spacer,
    SupportedThemes,
    Vertical,
    View,
    WebGen,
} from "https://raw.githubusercontent.com/lucsoft/WebGen/104bc41/mod.ts";
import "../assets/landing.css";
import webgen from "../assets/webgen.svg";
import hmsys from "../assets/hmsys.webp";
import background from "../assets/background.svg";
import backgroundWhite from "../assets/background_white.svg";

WebGen({
    icon: new BootstrapIcons(),
    events: {
        themeRefreshed: (data) => {
            document.body.style.backgroundImage = `url(${data === SupportedThemes.autoLight ? backgroundWhite : background})`;
        },
    },
});

const skillBar = (data: { [ name in string ]: number }) => {
    const keys = Object.entries(data);
    const component = Horizontal(
        ...keys.map(([ name ]) => PlainText(name)),
    ).addClass("skill-bar").draw();

    component.style.gridTemplateColumns = keys.map(([ _, weight ]) => `${weight}fr`).join(" ");
    return Custom(component);
};

View(() =>
    Vertical(
        Vertical(
            Horizontal(
                Spacer(),
                // Button("LOGIN")
                //     .asLinkButton("/account.html")
                //     .setStyle(ButtonStyle.Secondary),
                Button("DOCUMENTATION")
                    .setStyle(ButtonStyle.Secondary),
                // TODO: Add IconButton#asLinkButton
                Custom((() => {
                    const link = IconButton("github").draw() as HTMLAnchorElement;
                    link.href = "https://github.com/lucsoft";
                    return link;
                })()),
            ).setGap("0.5rem"),
        ).setMargin("2rem 1rem 0"),
        Horizontal(
            Vertical(
                PlainText("lucsoft", "h1"),
                PlainText("developer & designer", "span").addClass("subtitle", "themed"),
                PlainText("software & hardware with love ❤️").addClass("note", "themed"),
            ),
            Spacer(),
        ).addClass("welcome").setMargin("15vh 1rem 0"),
        Horizontal(
            PlainText("Project", "h2"),
            Spacer(),
        ).setMargin("9.3rem 1rem 1rem"),
        Horizontal(
            ButtonBig(hmsys, "HmSYS", "https://hmsys.de"),
            ButtonBig(webgen, "webgen", "https://github.com/lucsoft/webgen"),
            Spacer(),
        ).addClass("main-projects", "themed", "section"),
        Horizontal(
            Button("DataStoreDB")
                .setStyle(ButtonStyle.Inline)
                .asLinkButton("https://github.com/lucsoft/datastoredb-gui"),
            Spacer(),
            Button("web_bson")
                .setStyle(ButtonStyle.Inline)
                .asLinkButton("https://github.com/lucsoft/deno_bson/"),
            Spacer(),
            Button("bbn.one")
                .setStyle(ButtonStyle.Inline)
                .asLinkButton("https://bbn.one/"),
            Spacer(),
            Button("remod.dev")
                .setStyle(ButtonStyle.Inline)
                .asLinkButton("https://remod.dev/"),
        ).addClass("side-projects"),
        Horizontal(
            PlainText("Skills", "h2"),
            Spacer(),
        ).setMargin("7rem 1rem 0"),
        Vertical(
            skillBar({
                frontend: 8,
                "ui/ux": 6,
                backend: 6,
                hardware: 3,
                app: 2,
            }),
        ).addClass("section"),
        Vertical(
            PlainText(
                "CSS UI UX RUST JAVASCRIPT DENO PHP C# JAVA LUA SWIFT NODE.JS OPENAPI ASYNCAPI WEBCOMPONENTS ARDUINO LIT-HTML REDUX C++ FIGMA REACT LINUX DOCKER JAVAFX",
            ).addClass("themed", "tech-names"),
        ).addClass("section"),
    )
).setMaxWidth("60rem").appendOn(document.body);

function ButtonBig(imgUrl: string, title: string, href: string) {
    const link = createElement("a");
    link.href = href;
    link.append(
        Horizontal(
            Custom(img(imgUrl)),
            PlainText(title),
        ).addClass("project", "wbutton", "grayscaled", "inline").draw(),
    );
    return Custom(link);
}
