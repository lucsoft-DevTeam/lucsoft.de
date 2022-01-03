import { build } from "https://deno.land/x/esbuild@v0.14.10/mod.js";
import { httpImports } from "https://deno.land/x/esbuild_plugin_http_imports/index.ts";
import { emptyDirSync } from "https://deno.land/std@0.120.0/fs/mod.ts";
emptyDirSync("dist");
Deno.copyFileSync("index.html", "dist/index.html");

await build({
    loader: {
        ".woff": "file",
        ".woff2": "file",
        ".html": "file",
        ".svg": "file",
        ".png": "file",
    },
    plugins: [httpImports({
        onCacheMiss: (path) => console.log("📡", "Loading", path),
    })],
    bundle: true,
    entryPoints: {
        "landing": "./pages/landing.ts",
    },
    outdir: "dist",
    minify: true,
    splitting: true,
    format: "esm",
    logLevel: "info",
});
Deno.exit();
