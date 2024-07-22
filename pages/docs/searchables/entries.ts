//# Entry
//> Entry are rich row elements used for lists.
import { Body, Entry, Grid, WebGen } from "webgen/mod.ts";

WebGen();

Body(
//HIDE-START
    Grid(
//HIDE-END
    Entry({
        title: "Rich Rows"
    })
        .addClass("small")
        .onClick(() => alert("You did it!")),
    Entry({
        title: "With titles",
        subtitle: "And subtitles"
    })
        .addClass("small")
        .onClick(() => alert("You did it!")),
//HIDE-START
    )
        .setWidth("100vw")
        .setGap()
//HIDE-END
);