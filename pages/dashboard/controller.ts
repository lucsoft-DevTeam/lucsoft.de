import { Card, Horizontal, Spacer, View, headless, Grid, Custom } from "https://deno.land/x/webgen@2.0.0-beta.8/mod.ts";
import { NavigationMenu } from "./navigation.ts";
import { systemMonitor } from "./sysmonitor.ts";
import { ProfileData, StatsType } from "./types.ts";
import { SmallCard } from "./hmsys.ts";
function bytes(number: number) {
    let interval = number;
    interval = number / 1000000;
    if (interval > 1) return `${Math.floor(interval)}Mb`;
    interval = number / 1000;
    return `${Math.floor(interval)}Kb`;
}
function timeSince(date: number) {
    const seconds = Math.floor((new Date().getTime() - date) / 1000);
    let interval = seconds / 31536000;
    if (interval > 1) return `${Math.floor(interval)}y`;
    interval = seconds / 2592000;
    if (interval > 1) return `${Math.floor(interval)}m`;
    interval = seconds / 86400;
    if (interval > 1) return `${Math.floor(interval)}d`;
    interval = seconds / 3600;
    if (interval > 1) return `${Math.floor(interval)}h`;
    interval = seconds / 60;
    return `${Math.floor(interval)}min`;
}
export const controller = View<{ profile: ProfileData; stats: StatsType }>(({ state }) => Horizontal(
    NavigationMenu(state),
    Grid(
        SmallCard(state.stats?.host.loadAverage[ 0 ].toFixed(2), "Load Average"),
        SmallCard(state.stats?.userCount.toString(), "Active Users"),
        SmallCard(state.stats ? timeSince(state.stats?.uptime) : undefined, "Uptime"),
        SmallCard(state.stats ? bytes(state.stats?.host.memory.heapUsed) : undefined, "Heap used"),
        SmallCard(state.stats ? `${(((state.stats?.host.systemMemory.swapTotal - state.stats?.host.systemMemory.swapFree) / state.stats?.host.systemMemory.swapTotal) * 100).toFixed(0)}%` : undefined, "Swap"),
        SmallCard(state.stats ? `${(((state.stats.host.systemMemory.free + state.stats.host.systemMemory.available) / state.stats?.host.systemMemory.total) * 100).toFixed(0)}%` : undefined, "Memory"),
        [
            { width: 4, heigth: 3 },
            Card(headless(Custom(systemMonitor)))
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
