//# Button
//> Buttons promote efficient and streamlined user workflows by enabling quick decision-making.
import { sample } from "https://deno.land/std@0.215.0/collections/sample.ts";
import { Body, Button, ButtonStyle, asPointer } from "webgen/mod.ts";

const styles = [
    ButtonStyle.Inline,
    ButtonStyle.Normal,
    ButtonStyle.Secondary,
    ButtonStyle.Spinner,
];
const style = asPointer(sample(styles)!);
setInterval(() => style.setValue(sample(styles)!), 1000);

Body(
    Button("BUTTON")
        .setStyle(style)
);