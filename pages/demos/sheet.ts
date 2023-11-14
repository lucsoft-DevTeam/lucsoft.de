import { deferred } from "https://deno.land/std@0.206.0/async/deferred.ts";
import { Body, Button, ButtonStyle, Color, Component, Content, Entry, Flow, Grid, Label, Pointer, WebGen, asPointer, css, isMobile, refMerge } from "webgen/mod.ts";

WebGen();

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

    .wstacking-sheets.desktop-variant .wsheet:not(:first-child) {
        --sheet-width: var(--sheet-desktop-width, min(calc(100% - 15px)));
        --sheet-height: var(--sheet-desktop-height, min(calc(100% - 15px)));
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

class SheetsComponent extends Component {
    private readonly sheets: Pointer<SheetComponent[]> = asPointer([]);

    constructor(component: Component) {
        super();
        this.onClick(() => {
            this.remove(this.sheets.getValue().at(-1)!);
        });
        this.addClass("wstacking-sheets");
        this.addClass(isMobile.map(it => it ? "mobile-variant" : "desktop-variant"));

        this.add(new SheetComponent(asPointer(0), component));
    }

    add(sheet: SheetComponent) {
        this.sheets.setValue([ ...this.sheets.getValue(), sheet ]);
        const index = this.sheets.getValue().length - 1;

        const element = sheet.draw();
        element.style.zIndex = `${(index) + 10}`;

        const sheetVisible = this.sheets.map(it => it.includes(sheet));
        const sheetOnTop = this.sheets.map(it => it.at(-1) === sheet);

        sheet.addClass(sheetVisible.map(it => it ? "shown" : "hidden"));
        sheet.addClass(sheetOnTop.map(it => it ? "on-top" : "not-on-top"));

        sheet.addClass(refMerge({ sheets: this.sheets }).map(({ sheets }) => (sheets.length - 1) > 0 ? "background" : "no-background"));

        isMobile.map(mobile => {
            element.style.setProperty("--sheet-index", `${index > 0 && !mobile ? index - 1 : index}`);
        });

        sheet.onClick((ev) => {
            ev.stopPropagation();
        });

        this.sheets.map(it => it.length).listen(it => {
            if (it && it > 0) {
                element.style.setProperty("--sheet-reverse-index", `${it - index - 1}`);
            }
            else
                element.style.setProperty("--sheet-reverse-index", `0`);
        });

        this.wrapper.append(element);
        return this;
    }

    async remove(sheet: SheetComponent) {
        // find index
        const index = this.sheets.getValue().indexOf(sheet);
        const animationEnded = deferred();

        this.wrapper.children[ index ].addEventListener("animationend", () => animationEnded.resolve());

        this.sheets.setValue(this.sheets.getValue().filter(it => it !== sheet));

        await animationEnded;

        this.wrapper.children[ index ].remove();

        return this;
    }

    setSheetWidth(size: string): this {
        this.wrapper.style.setProperty("--sheet-desktop-width", size);
        return this;
    }

    setSheetHeight(size: string): this {
        this.wrapper.style.setProperty("--sheet-desktop-height", size);
        return this;
    }
}

export const Sheets = (sheet: Component) => new SheetsComponent(sheet);

export class ScrollableComponent extends Component {
    constructor(private readonly content: Component[]) {
        super();
        this.addClass("wscrollable");
        this.wrapper.append(...content.map(it => it.draw()));
    }
}

export const Scrollable = (...content: Component[]) => new ScrollableComponent(content);

export const Sheet = (content: Component) => new SheetComponent(asPointer(0), content);

const sheets = Sheets(
    Flow(
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
    ).setMargin("1rem 0")
)
    .setSheetWidth("min(calc(100% - 15px), 50rem)")
    .setSheetHeight("min(calc(100% - 15px), 70rem)");

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
                .setAlign("center")
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
                .setAlign("center")
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
);

Body(sheets.setHeight("100vh"));