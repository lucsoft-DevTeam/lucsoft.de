//# Taglist
//> Tags visually represent categories/topics for easy content scanning and relevance.
import { Body, Taglist, asRef, css } from "webgen/mod.ts";

//HIDE-START
document.adoptedStyleSheets.push(css`
    #taglist {
        --color-colored-lightness: 100%;
        --color-colored-font: #000000;
        width: unset;
    }
`);
//HIDE-END

const selected = asRef(0);

Body(
    Taglist([
        "ACTION",
        "ACTION"
    ], selected)
        .setId("taglist")
);