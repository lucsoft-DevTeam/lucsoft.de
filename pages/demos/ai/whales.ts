import { Body, Box, Button, ButtonStyle, Content, Flow, FullWidthSection, Grid, Image, Label, WebGen } from "webgen/mod.ts";

WebGen();

// Generate some website to show of some facts about Whales
Body(
    Box(
        Content(
            Grid(
                Label("Creature of the Sea")
                    .setTextSize("2xl")
                    .setFontWeight("bold"),
                Grid(
                    Button("Home")
                        .setStyle(ButtonStyle.Inline)
                        .setJustify("center"),
                    Button("Videos")
                        .setStyle(ButtonStyle.Inline)
                        .setJustify("center"),
                    Button("More")
                        .setStyle(ButtonStyle.Inline)
                        .setJustify("center"),
                )
                    .setGap("0.5rem")
                    .setEvenColumns(3)
            )
                .setMargin("1rem 0 0")
                .setRawColumns("auto max-content")
                .setAlign("center")
        ),
        Flow(
            Content(
                FullWidthSection(
                    Image("https://source.unsplash.com/random/1920x500?whale", "Whale")
                        .setHeight("500px")
                        .resizeToBox()
                ),
                Label("Fascinating Whale Facts")
                    .setTextSize("7xl")
                    .setFontWeight("bold"),
                Label("Whales are a widely distributed and diverse group of fully aquatic placental marine mammals. They are an informal grouping within the infraorder Cetacea, usually excluding dolphins and porpoises."),

                Label("Size")
                    .setTextSize("3xl")
                    .setFontWeight("bold"),
                Label("Whales are the largest animals on earth. The blue whale is the largest animal that has ever lived, growing up to 100 feet long and weighing as much as 200 tons. Even the smallest species of whale, the dwarf sperm whale, is larger than most other marine mammals.")
                    .setMargin("1rem 0"),

                Grid(
                    Image("https://source.unsplash.com/random/500x500?whale,small", "Whale")
                        .setAspectRatio("1/1"),
                    Image("https://source.unsplash.com/random/500x500?whale,medium", "Whale")
                        .setAspectRatio("1/1"),
                    Image("https://source.unsplash.com/random/500x500?whale,large", "Whale")
                        .setAspectRatio("1/1"),
                )
                    .setGap("1rem")
                    .setDirection("column")
                    .setAutoColumn("1fr"),
                Label("Diet")
                    .setTextSize("3xl")
                    .setFontWeight("bold"),

                Label("Whales are carnivores, which means they eat meat. Some whales eat fish, while others eat marine mammals such as seals and other species of whale. They have been known to eat squid as well."),
                Image("https://source.unsplash.com/random/800x800?seafood", "Whale")
                    .setHeight("800px")
            )
        )
    )
        .setMargin("0 0 2rem"),
);