//# Pointers
//> Pointers are box values that can have event listeners, mappers, getters and setters for your values.
import { asPointer, Button, ButtonStyle, Grid, Label, ref, View } from "webgen/mod.ts";

const value = asPointer(0);

View(() =>
    Grid(
        Label("You clicked the Button this many times:")
            .setFont(.8, 600)
            .setAlign("center"),
        Label(ref`${value}`)
            .setFont(2),
        Button("The Clicker")
            .setStyle(ButtonStyle.Secondary)
            .onClick(() => {
                value.setValue(value.getValue() + 1);
            })
    )
        .setGap("0.5rem")
        .setJustify("center")
        .setEvenColumns(1)
).appendOn(document.body);