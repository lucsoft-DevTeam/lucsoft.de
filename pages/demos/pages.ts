import { delay } from "https://deno.land/std@0.191.0/async/delay.ts";
import { Body, Box, Button, Component, Content, Flow, Grid, Items, Label, RouteRegistry, StartRouting, WebGen, activeRoute, asRef, createRoute, ref } from "webgen/mod.ts";

WebGen();

const isAdmin = asRef(false);

const routeOne = createRoute({
    path: "/p/demos/pages"
});

const routeTwo = createRoute({
    path: "/p/demos/pages?wow",
    events: {
        onActive: async () => {
            await delay(5000);
        }
    }
});

const routeThree = createRoute({
    path: "/p/demos/pages?wow&test",
    events: {
        onActive: () => {
            if (!isAdmin.getValue())
                logout.navigate({});
        }
    }
});

const logout = createRoute({
    path: "/logout"
});

Body(
    Content(
        Flow(
            Box(
                Label("Hello World")
            ),
            Grid(
                Items(RouteRegistry, route =>
                    Box(
                        Label(route.patternUrl),
                        Label(ref`${activeRoute.map(activeRoute => activeRoute === route ? "active" : "inactive")}`),
                    )
                        .removeFromLayout()
                ),
            )
                .setRawColumns("max-content max-content")
                .setGap("0 1rem"),
            Grid(
                Button("Route One")
                    .onPromiseClick(async () => {
                        await routeOne.navigate({}).finished;
                    }),

                Button("Route One (reload)")
                    .onClick(() => {
                        routeOne.location({});
                    }),

                Button("Route Two")
                    .onPromiseClick(async () => {
                        await routeTwo.navigate({}).finished;
                    }),

                Button("Route Three")
                    .onPromiseClick(async () => {
                        await routeThree.navigate({}).finished;
                    }),
            )
                .setAutoColumn("max-content")
                .setDirection("column")
                .setGap(),
            Button(isAdmin.map(isAdmin => isAdmin ? "Currently: Admin" : "Currently: User" as string | Component))
                .onClick(() => {
                    isAdmin.setValue(!isAdmin.getValue());
                }),
        )
    )
);
StartRouting();