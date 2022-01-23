import { WebGen, Dialog, img, createElement, Custom, Component, Vertical, Horizontal, PlainText, Input, Spacer, SupportedThemes } from "https://deno.land/x/webgen@v2.0.0-beta.0/mod.ts";
// @deno-types="../custom.d.ts"
import hmsys from "../assets/hmsys.png";
import '../assets/login.css';

WebGen({
    theme: SupportedThemes.light,
})

function Form(...compoents: Component[]) {
    const form = createElement("form");
    form.append(...compoents.map(x => x.draw()))
    return Custom(form);
}

Dialog(() => Vertical(
    Horizontal(
        Custom(img(hmsys)),
        Spacer()
    ),
    PlainText("Sign In", "h1"),
    Form(
        Input({
            placeholder: "E-Mail",
            type: "email"
        }),
        Input({
            placeholder: "Password",
            type: "password"
        })
    ).addClass("form"),
)).addButton("Next", () => {

}).open()