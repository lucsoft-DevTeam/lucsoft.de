import { HmSYSConnector, MessageType, SyncResponse } from "https://deno.land/x/hmsys_connector@v0.6.0/mod.ts";
import { controller } from "./controller.ts";
import { StatsType } from "./types.ts";
export async function refresh(network: HmSYSConnector) {
    const rsp = (await network.api.triggerWithResponse("@lucsoft/StatsModule", { type: "getCurrentStats", action: MessageType.Trigger }) as SyncResponse).data as unknown as StatsType
    controller.unsafeViewOptions().update({
        stats: rsp
    })
    setTimeout(() => refresh(network), rsp.nextUpdate - new Date().getTime());
}