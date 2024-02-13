//# TextInput
//> TextInputs provide flexibility for users to enter variable-length input, such as short phrases or long paragraphs.
import { Body, Label, TextInput, Vertical, ref } from "webgen/mod.ts";

const data = asState({
    example: ""
});

Body(
    Vertical(
        TextInput("text", "Placeholder")
            .sync(data, "example"),
        Label(ref`Length: ${data.$example.map(it => it.length)}`)
    ).setGap("0.5rem")
);