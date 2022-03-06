import { Card, Horizontal, Spacer, View, headless, Grid, Custom } from "https://deno.land/x/webgen@2.0.0-beta.8/mod.ts";
import { SmallCard } from "../../components/Card.ts";
import { bytes, timeSince } from "../../helper/convert.ts";
import { NavigationMenu } from "./navigation.ts";
import { SystemView } from "./sysmonitor.ts";
import { ProfileData, StatsType } from "./types.ts";

const container = SystemView.asComponent()
export const controller = View<{ profile: ProfileData; stats: StatsType }>(({ state }) => Horizontal(
    NavigationMenu(state),
    Grid(
        SmallCard(state.stats?.host.loadAverage[ 0 ].toFixed(2), "Load Average"),
        SmallCard(state.stats?.userCount.toString(), "Users"),
        SmallCard(timeSince(state.stats?.uptime), "Uptime"),
        SmallCard(bytes(state.stats?.host.heap), "Heap used"),
        SmallCard(state.stats ? `${state.stats?.host[ "sysMem%" ]}%` : undefined, "Memory"),
        [
            { width: 4, heigth: 3 },
            Card(headless(container)).addClass("continer-system-view")
        ],
        Spacer(),
        Spacer(),
        Spacer(),
        SmallCard("0", "Warnings"),
        SmallCard("0", "Errors")
    )
        .addClass("grid")
        .setGap("1.2rem")
        .setEvenColumns(5, "9.2rem"),
    Spacer()
));
