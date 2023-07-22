//# Switch
//> Tags visually represent categories/topics for easy content scanning and relevance.
import { delay } from "https://deno.land/std@0.191.0/async/delay.ts";
import { asPointer, Switch, View } from "webgen/mod.ts";

const selected = asPointer(false);

View(() =>
    Switch(selected)
        .onPromiseClick(async () => {
            await delay(800);
            selected.setValue(!selected.getValue());
        })
).appendOn(document.body);