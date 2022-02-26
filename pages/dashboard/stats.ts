import data from "../../config.json" assert { type: "json"};
import { controller } from "./controller.ts";
import { StatsType } from "./types.ts";
export async function refresh() {
    const rsp = await fetch(`${(data.secure ? 'https://' : 'http://') + data.endpoint}/stats`);
    if (!rsp.ok) return;
    const rspJson = await rsp.json() as StatsType
    controller.unsafeViewOptions().update({
        stats: rspJson
    })
    setTimeout(() => refresh(), rspJson.nextUpdate - new Date().getTime());
}