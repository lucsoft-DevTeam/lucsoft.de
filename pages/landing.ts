import { BIcon, Body, Box, ButtonStyle, Content, Custom, DropDownInput, Horizontal, IconButton, Image, ImageComponent, Label, LinkButton, Spacer, SupportedThemes, Vertical, WebGen, createElement } from "webgen/mod.ts";
import background from "../assets/background.svg";
import backgroundWhite from "../assets/background_white.svg";
import hmsys from "../assets/hmsys.webp";
import "../assets/landing.css";
import webgen from "../assets/webgen.svg";

WebGen({
    events: {
        themeRefreshed: (data) => {
            document.body.style.backgroundImage = `url(${data === SupportedThemes.autoLight ? backgroundWhite : background})`;
        },
    },
});

const skillBar = (data: { [ name in string ]: number }) => {
    const keys = Object.entries(data);
    const component = Horizontal(
        ...keys.map(([ name ]) => Label(name)),
    ).addClass("skill-bar").draw();

    component.style.gridTemplateColumns = keys.map(([ _, weight ]) => `${weight}fr`).join(" ");
    return Custom(component);
};

Body(
    Content(
        Vertical(
            Vertical(
                Horizontal(
                    Spacer(),
                    // Button("LOGIN")
                    //     .asLinkButton("/account.html")
                    //     .setStyle(ButtonStyle.Secondary),
                    LinkButton("DOCUMENTATION", "/p/docs")
                        .setStyle(ButtonStyle.Secondary),
                    IconButton(BIcon("github"), "GitHub")
                        .asLinkButton("https://github.com/lucsoft"),
                ).setGap("0.5rem"),
            ).setMargin("2rem 1rem 0"),
            Box(
                DropDownInput("Hey", Array.from({ length: 30 }, (_, i) => `Item with the number ${i + 1}`))
            ),
            Horizontal(
                Vertical(
                    Label("lucsoft", "h1"),
                    Label("developer & designer", "span").addClass("subtitle", "themed"),
                    Label("software & hardware with love ❤️").addClass("note", "themed"),
                ),
                Spacer(),
            ).addClass("welcome").setMargin("15vh 1rem 0"),
            Horizontal(
                Label("Project", "h2"),
                Spacer(),
            ).setMargin("9.3rem 1rem 1rem"),
            Horizontal(
                ButtonBig(Image(hmsys, "An Icon of HmSYS"), "HmSYS", "https://hmsys.de"),
                ButtonBig(Image(webgen, "An Icon of WebGen"), "WebGen", "https://github.com/lucsoft/webgen"),
                Spacer(),
            ).addClass("main-projects", "themed", "section"),
            Horizontal(
                LinkButton("DataStoreDB", "https://github.com/lucsoft/datastoredb-gui")
                    .setStyle(ButtonStyle.Inline),
                Spacer(),
                LinkButton("web_bson", "https://github.com/lucsoft/deno_bson/")
                    .setStyle(ButtonStyle.Inline),
                Spacer(),
                LinkButton("bbn.one", "https://bbn.one/")
                    .setStyle(ButtonStyle.Inline),
                Spacer(),
                LinkButton("remod.dev", "https://remod.dev/")
                    .setStyle(ButtonStyle.Inline),
            ).addClass("side-projects"),
            Horizontal(
                Label("Skills", "h2"),
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
                Label(
                    "CSS UI UX RUST JAVASCRIPT DENO PHP C# JAVA LUA SWIFT NODE.JS OPENAPI ASYNCAPI WEBCOMPONENTS ARDUINO LIT-HTML REDUX C++ FIGMA REACT LINUX DOCKER KUBERNETES JAVAFX",
                ).addClass("themed", "tech-names"),
            ).addClass("section"),
        )
    )
        .setMaxWidth("980px")
);

function ButtonBig(img: ImageComponent, title: string, href: string) {
    const link = createElement("a");
    link.href = href;
    link.append(
        Horizontal(
            img,
            Label(title),
        ).addClass("project", "wbutton", "grayscaled", "inline").draw(),
    );
    return Custom(link);
}
