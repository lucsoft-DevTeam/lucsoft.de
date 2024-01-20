import { deferred } from "https://deno.land/std@0.194.0/async/deferred.ts";

import { Body, Box, Cache, Component, Content, Custom, Grid, Image, Label, State, SupportedThemes, TextInput, WebGen, createElement, loadingWheel } from "webgen/mod.ts";
import webgen from "../../assets/webgen.svg";
import './index.css';
// @deno-types="https://esm.sh/v128/highlight.js@11.8.0/types/index.d.ts"
import hljs from "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/es/highlight.min.js";
import "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/es/languages/javascript.min.js";
import "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/es/languages/typescript.min.js";
import "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/styles/codepen-embed.min.css";
import searchables from "./searchables/index.json" with { type: "json" };
WebGen({
    theme: SupportedThemes.dark
});

async function load(item: typeof searchables[ number ]) {
    const defer = deferred<Component>();
    const sandbox = createElement("iframe");

    sandbox.src = "/searchables/" + item.id;

    sandbox.style.display = "none";
    sandbox.onload = () => {
        defer.resolve(Custom(sandbox.contentDocument?.querySelector("article")!).removeFromLayout());
        document.adoptedStyleSheets.push(...sandbox.contentDocument?.adoptedStyleSheets.map(it => {
            const sheet = new CSSStyleSheet();
            Array.from(it.cssRules).map(it => sheet.insertRule(it.cssText));
            return sheet;
        }) ?? []);
    };

    document.body.append(sandbox);

    return await defer;
}

const state = State({
    filter: ""
});
Body(
    Content(
        Grid(
            Image(webgen, "An Icon of WebGen"),
            Label("WebGen", "h1"),
            TextInput("text", "Search for Components...")
                .sync(state, "filter")
        ).addClass("header"),
        Box(
            state.$filter.map(search =>
                Box(
                    ...searchables
                        .filter(it =>
                            it.description.toLowerCase().includes(search.toLowerCase())
                            || it.title.toLowerCase().includes(search.toLowerCase())
                        )
                        .map(it => {
                            return Box(
                                Grid(
                                    Label(it.title).addClass("title"),
                                    Label(it.description).addClass("description"),
                                    Box(

                                        Cache(it.title,
                                            () => load(it),
                                            (type, val) => type == "loaded"
                                                ?
                                                val!
                                                : Box(Custom(loadingWheel() as Element as HTMLElement)).addClass("loading"))
                                            .removeFromLayout()
                                    ).addClass("holder"),

                                ),
                                CodeBlock(it.code.replaceAll(/((\/\/HIDE-START\n)(.|\n)*?(\/\/HIDE-END)\n?)/g, ""))
                            )
                                .addClass("item");
                        }
                        )
                ).addClass("searchables")
            ).asRefComponent(),
        )
    )
        .setMaxWidth("1630px")
);


function CodeBlock(source: string): Component {
    const item = createElement("pre");
    const code = createElement("code");
    code.classList.add();
    code.innerHTML = source;
    item.append(code);
    hljs.highlightElement(code);

    return Custom(item)
        .addClass("code");
}