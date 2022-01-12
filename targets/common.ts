import { emptyDirSync } from "https://deno.land/std@0.120.0/fs/empty_dir.ts";
import { copySync } from "https://deno.land/std@0.120.0/fs/copy.ts";

import { BuildOptions } from "https://deno.land/x/esbuild@v0.14.10/mod.js";
import { httpImports } from "https://deno.land/x/esbuild_plugin_http_imports/index.ts";

export const config: BuildOptions = {
    metafile: true,
    loader: {
      ".woff": "file",
      ".woff2": "file",
      ".html": "file",
      ".svg": "file",
      ".png": "file",
    },
    plugins: [
        {
            name: "statpoints",
            setup(build) {
                build.onStart(() => {
                    emptyDirSync("dist");
                    emptyDirSync("dist/games/nonogramm");
                    copySync("index.html", "dist/index.html");
                    copySync("index.html", "dist/games/nonogramm/index.html")
                })
            }
        },httpImports({
      onCacheMiss: (path) => console.log("📡", "Loading", path),
        }) ],
    bundle: true,
    entryPoints: {
        "entry": "./pages/landing.ts",
        "games/nonogramm/entry": "./pages/games/nonogramm.ts"
    },
    outdir: "dist/",
    minify: true,
    splitting: true,
    format: "esm",
    logLevel: "info",
  };