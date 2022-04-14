import { Card, Component, headless, Horizontal, PlainText, Spacer, Vertical } from "https://deno.land/x/webgen@2.0.0-beta.9/mod.ts";

export function SmallCard(text = "--", description: string): Component {
    return Card(headless(Vertical(
        Horizontal(
            PlainText(text)
                .setFont(2.3, 900)
                .addClass("font-big"),
            Spacer()
        ).setMargin("1.2rem 1rem 0.2rem"),
        Horizontal(
            PlainText(description)
                .setFont(0.88, 500),
            Spacer()
        ).setMargin("0 1rem"),
        Spacer()
    )));
}
