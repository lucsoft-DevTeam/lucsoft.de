import { Body, Button, ButtonStyle, Color, Content, Entry, Flow, Grid, Label, Sheet, SheetsStack, WebGen, isMobile } from "webgen/mod.ts";

WebGen();

const sheets = SheetsStack()
    .setSheetWidth("min(calc(100% - 15px), 50rem)")
    .setSheetHeight("min(calc(100% - 15px), 70rem)");

sheets.setDefault(Flow(
    Content(
        Label("Sheets demo!")
            .setTextSize("3xl")
            .setFontWeight("bold"),
        Label("This is a demo of the sheets component!"),
        Entry({
            title: "Storage"
        }).onClick(() => {
            sheets.add(storage);
        }),
        Entry({
            title: "Settings"
        }).onClick(() => {
            sheets.add(settings);
        }),
        Entry({
            title: "Credits"
        }).onClick(() => {
            sheets.add(storage);
        }),
        Entry({
            title: "About"
        }).onClick(() => {
            sheets.add(storage);
        }),
        Entry({
            title: "Help"
        }).onClick(() => {
            sheets.add(storage);
        }),
        Entry({
            title: "Support"
        }).onClick(() => {
            sheets.add(storage);
        }),
        Entry({
            title: "Feedback"
        }).onClick(() => {
            sheets.add(storage);
        }),
        Entry({
            title: "Privacy"
        }).onClick(() => {
            sheets.add(storage);
        }),
    )
).setMargin("1rem 0"));

const storage = Sheet(
    Flow(
        Content(
            Grid(
                Label("Storage")
                    .setTextSize("3xl")
                    .setFontWeight("bold"),
                Button("Done")
                    .setStyle(ButtonStyle.Inline)
                    .setColor(Color.Colored)
                    .onClick(() => {
                        sheets.remove(storage);
                    })
            )
                .setMargin("3rem 0 0")
                .setAlignItems("center")
                .setRawColumns("auto max-content"),

            Entry({
                title: "Advanced Options"
            })
                .addClass(isMobile.map(it => it ? "small" : "large"))
                .onClick(() => {
                    sheets.add(advancedOptions);
                })
        )
            .setMaxWidth("80rem")
    )
);

const settings = Sheet(
    Flow(
        Content(
            Grid(
                Label("Settings")
                    .setTextSize("3xl")
                    .setFontWeight("bold"),
                Button("Done")
                    .setStyle(ButtonStyle.Inline)
                    .setColor(Color.Colored)
                    .onClick(() => {
                        sheets.remove(settings);
                    })
            )
                .setMargin("3rem 0 0")
                .setAlignItems("center")
                .setRawColumns("auto max-content")
        )
    )
);

const advancedOptions = Sheet(
    Flow(
        Content(
            Grid(
                Label("Advanced Options")
                    .setTextSize("3xl")
                    .setFontWeight("bold"),
                Button("Done")
                    .setStyle(ButtonStyle.Inline)
                    .setColor(Color.Colored)
                    .onClick(() => {
                        sheets.remove(advancedOptions);
                    })
            )
                .setMargin("3rem 0 0")
                .setAlignItems("center")
                .setRawColumns("auto max-content"),
            Entry({
                title: "Omg, this is so advanced!"
            })
                .addClass(isMobile.map(it => it ? "small" : "large"))
                .onClick(() => { }),
            Entry({
                title: "Even more advanced!"
            })
                .addClass(isMobile.map(it => it ? "small" : "large"))

                .onClick(() => { }),
            Entry({
                title: "Easter Egg!"
            })
                .addClass(isMobile.map(it => it ? "small" : "large"))
                .onClick(() => { }),
            Entry({
                title: "Don't click me!"
            })
                .addClass(isMobile.map(it => it ? "small" : "large"))
                .onClick(() => { }),
            Entry({
                title: "I said don't click me!"
            })
                .addClass(isMobile.map(it => it ? "small" : "large"))
                .onClick(() => { }),
            Entry({
                title: "I'm warning you!"
            })
                .addClass(isMobile.map(it => it ? "small" : "large"))
                .onClick(() => { }),
            Entry({
                title: "I'm warning you! Last time!"
            })
                .addClass(isMobile.map(it => it ? "small" : "large"))
                .onClick(() => { }),
            Entry({
                title: "I'm warning you! Last time! I'm serious!"
            })
                .addClass(isMobile.map(it => it ? "small" : "large"))
                .onClick(() => { }),
            Entry({
                title: "I'm warning you! Last time! I'm serious! Don't click me!"
            })
                .addClass(isMobile.map(it => it ? "small" : "large"))
                .onClick(() => { }),
        )
    )
);

Body(sheets.setHeight("100vh"));