//# References
//> A Reference is at core a signal, but with more convenience. So reactive values that can be listened, mapped, changed and replaced.
import { Body, Button, ButtonStyle, Grid, Label, WebGen, asRef, ref } from "webgen/mod.ts";

WebGen();

const value = asRef(0);

Body(
    Grid(
        Label("You clicked the Button this many times:")
            .setTextSize("sm")
            .setAlignSelf("center"),
        Label(ref`${value}`)
            .setTextSize("5xl")
            .setFontWeight("bold"),
        Button("Add one")
            .setStyle(ButtonStyle.Secondary)
            .onClick(() => {
                value.setValue(value.getValue() + 1);
            })
    )
        .setGap("0.5rem")
        .setJustifyItems("center")
        .setEvenColumns(1)
);