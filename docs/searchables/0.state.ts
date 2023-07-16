//# State
//> A object allows you to pass a recursively proxied object, where values can also be backed by an pointer. (Powered by ArrowJS)
import { Button, ref, State, View } from "webgen/mod.ts";

const state = State({
    value: 0
});

View(() =>
    Button(ref`Clicked: ${state.$value}`)
        .onClick(() => {
            state.value += 1;
        })
).appendOn(document.body);