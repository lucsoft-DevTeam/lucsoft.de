import { HmResponse } from "https://deno.land/x/hmsys_connector@v0.6.0/mod.ts";
import { Component, createElement, Horizontal, Icon, PlainText, Spacer, Vertical, View } from "https://deno.land/x/webgen@2.0.0-beta.8/mod.ts";

export const systemMonitor = createElement("div");

const mapping: () => { [ type in HmResponse[ "type" ] ]: Component } = () => ({
    client: Icon("lightning-charge-fill"),
    profile: Icon("person-badge"),
    query: Icon("search"),
    sync: Icon("info-lg")
})

export const SystemView = View<{ data: HmResponse[] }>(({ state }) => Vertical(
    Horizontal(
        PlainText("System-Events Monitor")
            .setFont(0.88, 500),
        Spacer()
    ).setMargin("1rem 1rem"),
    ...(state.data ?? []).map(x => Horizontal(
        mapping()[ x.type ] ?? Icon("activity"),
        PlainText(JSON.stringify(x))
            .setFont(0.7, 400),
        Spacer()
    ).setGap("0.4rem").addClass("align-center-text")),
    Spacer()
)).appendOn(systemMonitor);