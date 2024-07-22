//# Dropdown
//> Dropdowns are a way to present a list of options to the user in a way that takes up minimal space. They should be used when the user has to select one option from a long list.
import { Body, DropDownInput, Grid, WebGen } from "webgen/mod.ts";

WebGen();

const options = [
    "Option 1",
    "Option 2",
    "Option 3",
    "Option 4",
    "Option 5",
    "Option 6",
    "Option 7",
    "Option 8",
    // ...
//HIDE-START
    ...Array.from({ length: 20 - 9 }, (_, i) => `Option ${i + 9}`),
//HIDE-END
    "Option 20"
];

Body(
    Grid(
        DropDownInput("Select an option", options)
            .setMargin("1rem 0 0")
    )
        .setHeight("100vh")
);
//HIDE-START
requestAnimationFrame(() => document.querySelector('button')?.click());
//HIDE-END
