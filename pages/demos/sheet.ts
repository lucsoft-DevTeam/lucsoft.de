import { Body, Box, Button, ButtonStyle, Color, Component, Content, Entry, Flow, Grid, Label, Pointer, WebGen, asPointer, css, isMobile, refMerge } from "webgen/mod.ts";

WebGen();


const activeSheetIndex = asPointer(0);

enum SheetType {
    STORAGE,
    SETTINGS
}

const sheetType = asPointer(SheetType.STORAGE);
const sheetOffset = asPointer(0);


class SheetComponent extends Component {
    // Has Offset
    // Has Kind Children
    constructor(public readonly offset: Pointer<number>, public readonly kind: Component) {
        super();
        this.addClass("wsheet");
        this.wrapper.append(kind.draw());
    }

    setWidth(size: string): this {
        this.wrapper.style.setProperty("--sheet-desktop-width", size);
        return this;
    }

    setHeight(size: string): this {
        this.wrapper.style.setProperty("--sheet-desktop-height", size);
        return this;
    }
}


document.adoptedStyleSheets.push(css`
    .wstacking-sheets {
        display: grid;
        grid-template: 100% / 100%;
        place-items: center;
        overflow: hidden;
    }
    .wsheet {
        grid-column: 1 / 1;
        grid-row: 1 / 1;
        border-radius: var(--border-radius);
        background-color: transparent;
        transition: all 500ms ease;
        --sheet-reverse-index: 0;
        --sheet-index: 0;
        --sheet-opacity: calc(1 - calc(var(--sheet-reverse-index) * 0.3));
        --sheet-scale: calc(1 - calc(calc(var(--sheet-reverse-index)) * 0.03));
        transform: scale(var(--sheet-scale)) translate(0, calc(var(--sheet-index) * 30px));
        margin-bottom: calc(var(--sheet-index) * 30px);
        width: var(--sheet-width, 100%);
        height: calc(var(--sheet-height, 100%) - calc(var(--sheet-index) * 30px));
        display: grid;
        grid-template-columns: 1fr;
        overflow: auto;
    }

    .wstacking-sheets.desktop-variant .wsheet {
        --sheet-width: var(--sheet-desktop-width, 100%);
        --sheet-height: var(--sheet-desktop-height, 100%);
    }

    .wsheet.hidden {
        display: none;
    }

    .wsheet.background {
        background-color: hsl(240deg, 3.45%, calc(11.37% * var(--sheet-opacity)));
    }

    .wstacking-sheets:not(.mobile-variant) .wsheet:first-child.background {
        background-color: transparent;
        filter: blur(10px);
    }

    .wsheet:not(.on-top) {
        pointer-events: none;
        overflow: hidden;
    }

    .wsheet:not(:first-child).shown {
        animation: slide-in 300ms cubic-bezier(.75,.04,.69,1.02);
    }

    .wstacking-sheets.mobile-variant .wsheet:not(:first-child).shown {
        animation-name: slide-in-full;
    }

    .wsheet:not(:first-child):not(.shown) {
        animation: slide-out 300ms cubic-bezier(.75,.04,.69,1.02);
    }

    .wstacking-sheets.mobile-variant .wsheet:not(:first-child):not(.shown) {
        animation-name: slide-out-full;
    }

    @keyframes slide-out-full {
        from {
            display: block;
            transform: scale(1) translate(0, calc(var(--sheet-index) * 30px));
        }
        to {
            display: block;
            transform: scale(1) translate(0, 100%);
        }
    }


    @keyframes slide-out {
        from {
            display: block;
            transform: scale(1) translate(0, calc(var(--sheet-index) * 30px));
        }
        to {
            display: block;
            opacity: 0;
            transform: scale(1) translate(0, 20%);
        }
    }

    @keyframes slide-in-full {
        from {
            transform: translate(0, 100%);
        }
    }

    @keyframes slide-in {
        from {
            opacity: 0;
            transform: translate(0, 20%);
        }
    }

    .wscrollable {
        overflow: auto;
    }
`);

// TODO: Convert this Component to be Pointer based and only use the last layer as active layer
class StackingSheetsComponent extends Component {
    constructor(private activeSheetIndex: Pointer<number>, layers: SheetComponent[]) {
        super();
        this.onClick(() => {
            activeSheetIndex.setValue(activeSheetIndex.getValue() - 1);
        });
        this.addClass("wstacking-sheets");
        this.addClass(isMobile.map(it => it ? "mobile-variant" : "desktop-variant"));
        for (const [ index, layer ] of layers.entries()) {
            const sheet = layer.draw();
            sheet.style.zIndex = `${(index) + 10}`;

            const layerVisible = this.activeSheetIndex.map(it => index <= it);
            const layerIsOnTop = this.activeSheetIndex.map(it => index === it);

            layer.addClass(layerVisible.map(it => it ? "shown" : "hidden"));
            layer.addClass(layerIsOnTop.map(it => it ? "on-top" : "not-on-top"));

            layer.addClass(refMerge({ activeSheetIndex, isMobile }).map(({ isMobile, activeSheetIndex }) => activeSheetIndex > 0 || isMobile ? "background" : "no-background"));

            isMobile.map(mobile => {
                sheet.style.setProperty("--sheet-index", `${index > 0 && !mobile ? index - 1 : index}`);
            });

            layer.onClick((ev) => {
                ev.stopPropagation();
            });
            activeSheetIndex.listen(it => {
                if (it && it > 0) {
                    sheet.style.setProperty("--sheet-reverse-index", `${it - index}`);
                }
                else
                    sheet.style.setProperty("--sheet-reverse-index", `0`);
            });

            this.wrapper.append(sheet);
        }
    }
}

export const StackingSheets = (index: Pointer<number>, ...layers: SheetComponent[]) => new StackingSheetsComponent(index, layers);

export class ScrollableComponent extends Component {
    constructor(private readonly content: Component[]) {
        super();
        this.addClass("wscrollable");
        this.wrapper.append(...content.map(it => it.draw()));
    }
}

export const Scrollable = (...content: Component[]) => new ScrollableComponent(content);


Body(
    StackingSheets(
        activeSheetIndex,
        // Sheet Index two
        new SheetComponent(
            asPointer(0),
            Flow(
                Content(
                    Label("Sheets demo!")
                        .setTextSize("3xl")
                        .setFontWeight("bold"),
                    Label("This is a demo of the sheets component!"),
                    Entry({
                        title: "Storage"
                    }).onClick(() => {
                        activeSheetIndex.setValue(1);
                        sheetType.setValue(SheetType.STORAGE);
                    }),
                    Entry({
                        title: "Settings"
                    }).onClick(() => {
                        activeSheetIndex.setValue(1);
                        sheetType.setValue(SheetType.SETTINGS);
                    }),
                    Entry({
                        title: "Credits"
                    }).onClick(() => {
                        activeSheetIndex.setValue(1);
                        sheetType.setValue(SheetType.SETTINGS);
                    }),
                    Entry({
                        title: "About"
                    }).onClick(() => {
                        activeSheetIndex.setValue(1);
                        sheetType.setValue(SheetType.SETTINGS);
                    }),
                    Entry({
                        title: "Help"
                    }).onClick(() => {
                        activeSheetIndex.setValue(1);
                        sheetType.setValue(SheetType.SETTINGS);
                    }),
                    Entry({
                        title: "Support"
                    }).onClick(() => {
                        activeSheetIndex.setValue(1);
                        sheetType.setValue(SheetType.SETTINGS);
                    }),
                    Entry({
                        title: "Feedback"
                    }).onClick(() => {
                        activeSheetIndex.setValue(1);
                        sheetType.setValue(SheetType.SETTINGS);
                    }),
                    Entry({
                        title: "Privacy"
                    }).onClick(() => {
                        activeSheetIndex.setValue(1);
                        sheetType.setValue(SheetType.SETTINGS);
                    }),

                )
            ).setMargin("1rem 0")
        )
            .setWidth("100%")
            .setHeight("100%"),
        new SheetComponent(
            sheetOffset,
            sheetType.map(it => it === SheetType.STORAGE
                ? Box(
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
                                        activeSheetIndex.setValue(0);
                                    })
                            )
                                .setMargin("3rem 0 0")
                                .setAlign("center")
                                .setRawColumns("auto max-content"),

                            Entry({
                                title: "Advanced Options"
                            })
                                .addClass(isMobile.map(it => it ? "small" : "large"))
                                .onClick(() => {
                                    activeSheetIndex.setValue(2);
                                })
                        )
                    )
                ).addClass("sheet")
                : Box(
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
                                        activeSheetIndex.setValue(0);
                                    })
                            )
                                .setMargin("3rem 0 0")
                                .setAlign("center")
                                .setRawColumns("auto max-content")
                        )
                    )
                )
            ).asRefComponent()
        )
            .setWidth("min(calc(100% - 15px), 50rem)")
            .setHeight("min(calc(100% - 15px), 50rem)"),
        new SheetComponent(
            asPointer(0),
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
                                activeSheetIndex.setValue(1);
                            })
                    )
                        .setMargin("3rem 0 0")
                        .setAlign("center")
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
        )
            .setWidth("min(calc(100% - 15px), 50rem)")
            .setHeight("min(calc(100% - 15px), 50rem)")
    ).setHeight("100vh")
);