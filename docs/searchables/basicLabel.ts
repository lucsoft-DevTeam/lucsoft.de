//# BasicLabel
//> Radios simplify decision-making by offering distinct and exclusive options.
import { BasicLabel, css, View } from "webgen/mod.ts";
//HIDE-START
document.adoptedStyleSheets.push(css`
    #basic-label {
        width: 2rem;
        height: 2rem;
    }
`);
//HIDE-END

View(() =>
    BasicLabel({
        title: "Hello World",
        subtitle: "This is some loooong text."
    })
        //HIDE-START
        .addClass("small")
        .setWidth("10rem")
    //HIDE-END
).appendOn(document.body);