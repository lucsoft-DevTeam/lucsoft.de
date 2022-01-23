import { serve } from "https://deno.land/x/esbuild@v0.14.12/mod.js";
import { config } from "./common.ts";
console.log("🚀 WebServer @ http://localhost:8080");

serve({
    port: 8080,
    servedir: "dist",
    onRequest: ({ method, remoteAddress, path }) =>
        console.log("📦", method, `http://localhost${path} from ${remoteAddress}`),
}, { ...config, minify: false, splitting: false });
