import { HmSYSConnector, MessageType, SyncResponse } from "https://deno.land/x/hmsys_connector@0.9.0/mod.ts";
import { controller } from "./controller.ts";
import { StatsType } from "./types.ts";

export async function refresh(network: HmSYSConnector) {
    const rsp = (await network.api.triggerWithResponse("@lucsoft/StatsModule/getCurrentStats", { action: MessageType.Trigger }) as SyncResponse).data as unknown as StatsType
    controller.viewOptions().update({
        stats: rsp
    })
    setTimeout(() => refresh(network), rsp.nextUpdate - new Date().getTime());
}