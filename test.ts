// deno-lint-ignore-file no-explicit-any
console.log("Checking...");
import { red, green } from "https://deno.land/std@0.167.0/fmt/colors.ts";
const domains = [
    "db.qs-befunddaten.de",
    "pig.qualiproof.de",
    "db.vetproof.de",
    "test.qualiproof.de",
    "test.vetproof.de",
    "qualitype.de",
].map(hostname => async () => {
    const data = await fetch("https://decoder.link/api", {
        method: "POST",
        mode: "no-cors",
        headers: {
            "content-type": "application/json;charset=UTF-8"
        },
        body: JSON.stringify({
            method: "sslchecker",
            params: {
                hostname,
                port: "443"
            }
        })
    })
    const json = await data.json() as any
    if (json.report_table.find((y: any[]) => y[ 0 ])) {
        console.log(`${hostname}...${red(`FAILED`)} (${json.report_table.find((y: any[]) => y[ 0 ]).filter((_, i) => i).join(" ")})`);
    } else
        console.log(`${hostname}...${green("ok")}`);
})

Promise.all(domains.map(x => x()));