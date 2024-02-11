//# Switch
//> Tags visually represent categories/topics for easy content scanning and relevance.
import { delay } from "https://deno.land/std@0.215.0/async/delay.ts";
import { Body, Switch, asPointer } from "webgen/mod.ts";

const selected = asPointer(false);

Body(
    Switch(selected)
        .onPromiseClick(async () => {
            await delay(800);
            selected.setValue(!selected.getValue());
        })
);