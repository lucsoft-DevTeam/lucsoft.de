import { sortBy } from "https://deno.land/std@0.194.0/collections/sort_by.ts";
import { walkSync } from "https://deno.land/std@0.194.0/fs/mod.ts";
import { serve } from "https://deno.land/x/esbuild_serve@1.3.0/mod.ts";


const items = Array.from(walkSync("./docs/searchables", { includeDirs: false, exts: [ ".ts" ] }));

const parsed = sortBy(items.map(item => {
    const path = Deno.readTextFileSync(item.path);
    const [ title, description, ...rest ] = path.split("\n");

    return {
        id: item.name.replace(".ts", ""),
        title: title.replace("//#", "").trim(),
        description: description.replace("//>", "").trim(),
        code: rest.join("\n")
    };
}), it => it.id);

Deno.writeTextFileSync("./docs/searchables/index.json", JSON.stringify(parsed, null, 2));

serve({
    pages: {
        "index": "./pages/landing.ts",
        "account": "./pages/account/mod.ts",
        "p/imprint": "./pages/imprint.ts",
        "p/docs": "./docs/index.ts",
        "games/nonogramm/index": "./pages/games/nonogramm.ts",
        ...Object.fromEntries(items.map(it => [ "searchables/" + it.name.replace(".ts", ""), it.path ]))
    },
    poylfills: [
        "https://unpkg.com/construct-style-sheets-polyfill",
        "https://esm.sh/object.hasown/auto.js"
    ]
});