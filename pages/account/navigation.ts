import { Button, ButtonStyle, Color, Component, Label, Vertical, ViewOptions } from "webgen/mod.ts";
import { ViewState } from "./types.ts";

export function NavigationMenu({ state, update }: ViewOptions<ViewState>): Component {
    return Vertical(
        Label("HmSYS")
            .addClass("title"),
        Label(`@${state.profile?.profile.username}`)
            .addClass("subtitle"),
        ...[ "Home", "Services", "Security", "Administration" ]
            .map((entry, index) =>
                Button(entry)
                    .setColor(Color.Critical)
                    .onClick(() => urlUpdate(update, {
                        menuState: index
                    }))
                    .setStyle((state.menuState ?? 0) == index
                        ? ButtonStyle.Normal
                        : ButtonStyle.Secondary
                    )
            ),
    ).setGap("1rem").setMargin("2.9rem 3rem 2.9rem 3.5rem").addClass("sidebar");
}

function urlUpdate(update: (data: Partial<ViewState>) => void, change: Partial<ViewState>) {
    update(change);
    const url = new URL(location.href);
    for (const [ name, value ] of Object.entries(change)) {
        url.searchParams.set(name, value.toString());

    }
    history.pushState({}, '', url);
}
