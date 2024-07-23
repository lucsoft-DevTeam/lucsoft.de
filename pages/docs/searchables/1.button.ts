//# Button
//> Buttons promote efficient and streamlined user workflows by enabling quick decision-making.
import { sample } from "jsr:@std/collections";
import { Body, Button, ButtonStyle, WebGen, asRef } from "webgen/mod.ts";

WebGen();

const styles = [
    ButtonStyle.Inline,
    ButtonStyle.Normal,
    ButtonStyle.Secondary,
    ButtonStyle.Spinner,
];
const style = asRef(sample(styles)!);
setInterval(() => style.setValue(sample(styles)!), 1000);

Body(
    Button("BUTTON")
        .setStyle(style)
);