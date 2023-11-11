//# Checkbox
//> Checkboxes offer granular control over non-direct actions or conditional behaviors.
import { Body, Checkbox } from "webgen/mod.ts";

Body(
    Checkbox(true)
        .onClick(() => {
            console.log("Clicked");
        })
);