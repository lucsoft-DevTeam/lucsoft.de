import { Button, ButtonStyle, Color, Component, PlainText, Vertical } from "https://deno.land/x/webgen@2.0.0-beta.9/mod.ts";
import { ProfileData } from "./types.ts";

export function NavigationMenu(state: Partial<{ profile: ProfileData; }>): Component {
    return Vertical(
        PlainText("HmSYS")
            .addClass("title"),
        PlainText(`@${state.profile?.profile.username}`)
            .addClass("subtitle"),
        Button("Home")
            .setColor(Color.Critical)
            .setStyle(ButtonStyle.Normal),
        Button("Services")
            .setColor(Color.Critical)
            .setStyle(ButtonStyle.Secondary),
        Button("Security")
            .setColor(Color.Critical)
            .setStyle(ButtonStyle.Secondary),
        Button("Administration")
            .setColor(Color.Critical)
            .setStyle(ButtonStyle.Secondary)
    ).setGap("1rem").setMargin("2.9rem 3rem 2.9rem 3.5rem").addClass("sidebar");
}