import { serve } from "https://deno.land/x/esbuild@v0.14.10/mod.js";
import { httpImports } from "https://deno.land/x/esbuild_plugin_http_imports/index.ts";
import { emptyDirSync } from "https://deno.land/std@0.120.0/fs/mod.ts";
emptyDirSync("dist");
Deno.copyFileSync("index.html", "dist/index.html");
console.log("🚀 WebServer @ http://localhost:8080");
serve({
    port: 8080,
    servedir: ".",
    onRequest: ({ method, remoteAddress, path }) =>
        console.log(
            "📦",
            method,
            `http://localhost${path} from ${remoteAddress}`,
        ),
}, {
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
    minify: true,
    splitting: true,
    format: "esm",
    logLevel: "info",
});
