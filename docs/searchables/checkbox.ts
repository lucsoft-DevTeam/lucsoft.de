//# Checkbox
//> Checkboxes offer granular control over non-direct actions or conditional behaviors.
import { Checkbox, MaterialIcons, View } from "webgen/mod.ts";

new MaterialIcons();

View(() =>
    Checkbox(true)
        .onClick(() => {
            console.log("Clicked");
        })
).appendOn(document.body);