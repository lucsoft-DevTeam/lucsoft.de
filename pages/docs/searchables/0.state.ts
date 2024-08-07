//# State
//> A object allows you to pass a recursively proxied object, where values can also be backed by an pointer. (Powered by ArrowJS)
import { Body, Button, WebGen, asState, ref } from "webgen/mod.ts";

WebGen();

const state = asState({
    value: 0
});

Body(
    Button(ref`Clicked: ${state.$value}`)
        .onClick(() => {
            state.value += 1;
        })
);