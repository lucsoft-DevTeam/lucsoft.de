//# Layers
//> Tags visually represent categories/topics for easy content scanning and relevance.
import { Body, Box, Layer, SupportedThemes, WebGen, css } from "webgen/mod.ts";
//HIDE-START
WebGen({
    theme: SupportedThemes.light
});
document.adoptedStyleSheets.push(css`
    #box {
        width: 4rem;
        height: 4rem;
        --color-overlay: 0;
        --layer-shadow: 0px 8px 12px 6px rgba(0, 0, 0, 0.15), 0px 4px 4px rgba(0, 0, 0, 0.3);
    }
`);
//HIDE-END

Body(
    Box(
        Layer(Box(), 5, "shadow")
            .setBorderRadius("mid")
            .setId("box")
    )
);