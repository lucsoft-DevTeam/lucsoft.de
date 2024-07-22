//# Checkbox
//> Checkboxes offer granular control over non-direct actions or conditional behaviors.
import { Body, Checkbox, WebGen } from "webgen/mod.ts";

WebGen();

Body(
    Checkbox(true)
        .onClick(() => {
            console.log("Clicked");
        })
);