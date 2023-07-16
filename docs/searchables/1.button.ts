//# Button
//> Buttons promote efficient and streamlined user workflows by enabling quick decision-making.
import { sample } from "https://deno.land/std@0.194.0/collections/sample.ts";
import { asPointer, Button, ButtonStyle, View } from "webgen/mod.ts";

const styles = [
    ButtonStyle.Inline,
    ButtonStyle.Normal,
    ButtonStyle.Secondary,
    ButtonStyle.Spinner,
];
const style = asPointer(sample(styles)!);
setInterval(() => style.setValue(sample(styles)), 1000);

View(() =>
    Button("BUTTON")
        .setStyle(style)
).appendOn(document.body);