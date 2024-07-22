//# TextInput
//> TextInputs provide flexibility for users to enter variable-length input, such as short phrases or long paragraphs.
import { Body, Label, TextInput, Vertical, WebGen, asRef, ref } from "webgen/mod.ts";

WebGen();

const value = asRef("Hello");

Body(
    Vertical(
        TextInput("text", "Placeholder")
            .ref(value),
        Label(ref`Length: ${value.map(it => it.length)}`)
    ).setGap("0.5rem"),
);