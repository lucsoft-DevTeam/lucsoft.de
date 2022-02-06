import { serve } from "https://deno.land/x/esbuild@v0.14.13/mod.js";
import { config } from "./common.ts";
console.log("🚀 WebServer @ http://localhost:1337");

await serve({
    port: 1337,
    servedir: "dist",
    onRequest: ({ method, remoteAddress, path }) =>
        console.log("📦", method, `http://localhost${path} from ${remoteAddress}`),
}, { ...config, minify: false, splitting: false });
