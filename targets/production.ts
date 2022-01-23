import { build } from "https://deno.land/x/esbuild@v0.14.12/mod.js";
import { config } from "./common.ts";

await build(config);
Deno.exit();
