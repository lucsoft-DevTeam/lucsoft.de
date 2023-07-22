//# Checkbox
//> Checkboxes offer granular control over non-direct actions or conditional behaviors.
import { Checkbox, View } from "webgen/mod.ts";

View(() =>
    Checkbox(true)
        .onClick(() => {
            console.log("Clicked");
        })
).appendOn(document.body);