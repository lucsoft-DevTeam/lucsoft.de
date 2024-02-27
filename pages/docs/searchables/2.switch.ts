//# Switch
//> Tags visually represent categories/topics for easy content scanning and relevance.
import { delay } from "https://deno.land/std@0.217.0/async/delay.ts";
import { Body, Switch, asRef } from "webgen/mod.ts";

const selected = asRef(false);

Body(
    Switch(selected)
        .onPromiseClick(async () => {
            await delay(800);
            selected.setValue(!selected.getValue());
        })
);