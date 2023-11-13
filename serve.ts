import { sortBy } from "https://deno.land/std@0.194.0/collections/sort_by.ts";
import { walkSync } from "https://deno.land/std@0.194.0/fs/mod.ts";
import { serve } from "https://deno.land/x/esbuild_serve@1.3.0/mod.ts";


const items = Array.from(walkSync("./pages/docs/searchables", { includeDirs: false, exts: [ ".ts" ] }));

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

Deno.writeTextFileSync("./pages/docs/searchables/index.json", JSON.stringify(parsed, null, 2));

serve({
    pages: {
        "index": "./pages/landing.ts",
        // "account": "./pages/account/mod.ts",
        "p/demos/ai/whales": "./pages/demos/ai/whales.ts",
        "sheet": "./pages/demos/sheet.ts",
        "p/imprint": "./pages/imprint.ts",
        "p/docs": "./pages/docs/index.ts",
        "games/nonogramm/index": "./pages/games/nonogramm.ts",
        ...Object.fromEntries(items.map(it => [ "searchables/" + it.name.replace(".ts", ""), it.path ]))
    },
    poylfills: [
        "https://unpkg.com/construct-style-sheets-polyfill",
        "https://esm.sh/object.hasown/auto.js"
    ],
    defaultTemplate(name) {
        return `
            <!DOCTYPE html>
            <html lang="en">

            <head>
                <meta charset="UTF-8">
                <title>lucsoft</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <meta property="og:type" content="article">
                <meta property="og:url" content="https://lucsoft.de">
                <meta property="og:title" content="lucsoft">
                <meta property="og:site_name" content="lucsoft.de">
                <meta property="og:image" content="https://lucsoft.de/img/3D_dark_lucsoft.png">
                <meta property="article:author" content="lucsoft">
                <meta property="author" content="lucsoft">
                <link rel="shortcut icon" href="https://lucsoft.de/favicon.ico" type="image/x-icon">
                <meta name="robots" content="all">
                <meta name="description" content="developer & designer
            software & hardware with love ❤️">
                <meta name="og:description" content="developer & designer
            software & hardware with love ❤️">
                <meta name="keywords" content="Developer, Designer, lucsoft" />
                <meta name="robots" content="index, follow">
                <meta name="google-site-verification" content="WQFLHyWhtvJGwM5ebNzMmjnkjpcsAGiHA0xPN7gXYBM" />
                <meta name="msvalidate.01" content="F08399C994EFE24C0FA95C42AB2B94AE" />
                <script type="application/ld+json">{"@context":"http://schema.org","@type":"Corporation","name":"lucsoft","url":"https://lucsoft.de","logo":"https://lucsoft.de/img/3D_dark_lucsoft.png","sameAs":["https://twitter.com/lucsoft","https://instagram.com/lucsoft_/","https://youtube.com/lucsoft","https://github.com/lucsoft/"]}</script>
                <script async src="https://www.googletagmanager.com/gtag/js?id=G-LB9WNYVBT2"></script>
                <script>
                    window.dataLayer = window.dataLayer || [];
                    function gtag() { dataLayer.push(arguments); }
                    gtag('js', new Date());

                    gtag('config', 'G-LB9WNYVBT2');
                </script>
            </head>

            <body>
                <script src="${name}.js" type="module"></script>
                <link rel="stylesheet" href="${name}.css">
            </body>

            </html>
        `;
    },
});