import { serve } from "https://deno.land/x/esbuild_serve@0.2.3/mod.ts";

serve({
    pages: {
        "index": "./pages/landing.ts",
        "account": "./pages/account/mod.ts",
        "p/imprint": "./pages/imprint.ts",
        "games/nonogramm/index": "./pages/games/nonogramm.ts"
    }
})