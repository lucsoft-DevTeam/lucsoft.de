import { HmResponse } from "https://deno.land/x/hmsys_connector@0.9.0/mod.ts";
import { Component, Grid, Horizontal, Icon, PlainText, Spacer, Vertical, View } from "webgen/mod.ts";

const mapping: () => { [ type in HmResponse[ "type" ] ]: Component } = () => ({
    client: Icon("lightning-charge-fill"),
    profile: Icon("person-badge"),
    query: Icon("search"),
    sync: Icon("info-lg"),
    pub: Icon("info-lg")
});

export const SystemView = View<{ data: HmResponse[]; }>(({ state }) => Grid(
    PlainText("System-Events Monitor")
        .setFont(0.88, 500)
        .setMargin("1rem 1rem"),
    Vertical(
        ...(state.data ?? []).filter((_, i, l) => l.length - i < 1000).map(x => Horizontal(
            mapping()[ x.type ] ?? Icon("activity"),
            PlainText(JSON.stringify(x))
                .setFont(0.6, 300),
            Spacer()
        ).setGap("0 0.4rem").addClass("align-center-text")),
    ).setPadding("0.5rem 0.7rem").addClass("bottom-up"),
).addClass("monistoring"));