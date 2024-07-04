//# Switch
//> Switch visually represent a direct action, like turning on or off a setting.
import { delay } from "https://deno.land/std@0.224.0/async/delay.ts";
import { Body, Switch, asRef } from "webgen/mod.ts";

const selected = asRef(false);

Body(
    Switch(selected)
        .onPromiseClick(async () => {
            await delay(800);
            selected.setValue(!selected.getValue());
        })
);