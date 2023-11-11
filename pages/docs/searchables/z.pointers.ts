//# Pointers
//> Pointers are box values that can have event listeners, mappers, getters and setters for your values.
import { Body, Button, ButtonStyle, Grid, Label, asPointer, ref } from "webgen/mod.ts";

const value = asPointer(0);

Body(
    Grid(
        Label("You clicked the Button this many times:")
            .setTextSize("sm")
            .setAlign("center"),
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
        .setJustify("center")
        .setEvenColumns(1)
);