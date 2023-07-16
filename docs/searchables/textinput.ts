//# TextInput
//> TextInputs provide flexibility for users to enter variable-length input, such as short phrases or long paragraphs.
import { Label, ref, State, TextInput, Vertical, View } from "webgen/mod.ts";

const data = State({
    example: ""
});

View(() =>
    Vertical(
        TextInput("text", "Placeholder")
            .sync(data, "example"),
        Label(ref`Length: ${data.$example.map(it => it.length)}`)
    ).setGap("0.5rem")
).appendOn(document.body);