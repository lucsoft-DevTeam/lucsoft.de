//# Entry
//> Entry are rich row elements used for lists.
import { Body, Entry, Grid } from "webgen/mod.ts";

Body(
    Grid(
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
    )
        .setWidth("100%")
        .setGap()

);