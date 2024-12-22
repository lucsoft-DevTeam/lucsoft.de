import { IsometricCanvas, IsometricCanvasProps, IsometricRectangle, IsometricRectangleProps, PlaneView } from "https://cdn.jsdelivr.net/npm/@elchininet/isometric@3.11.0/esm/index.js";
import { Card, Component, createElement, Custom, Grid, Spacer, Vertical, View } from "webgen/mod.ts";
import { SmallCard } from "../../components/Card.ts";
import { bytes, timeSince } from "../../helper/convert.ts";
import { NavigationMenu } from "./navigation.ts";
import { SystemView } from "./sysmonitor.ts";
import { ViewState } from "./types.ts";

const canvas = createElement("div");

const cube = new IsometricCanvas(<IsometricCanvasProps>{
    container: canvas,
    scale: 20,
    width: 500,
    height: 320,
    backgroundColor: "transparent"
});
type IsometricBoxProps = Omit<IsometricRectangleProps, "planeView" | "width" | "height"> & { posX: number, posY: number; };

const Color = {
    RichLemon: { fillColor: "hsl(58deg 100% 50%)", strokeColor: "hsl(58deg 100% 45%)" },
    Red: { fillColor: "hsl(348deg 90% 54%)", strokeColor: "hsl(348deg 90% 43%)" }
};
function Box(size: { width: number, height: number, depth: number; }, opts: IsometricBoxProps) {
    const topPiece = new IsometricRectangle({
        ...opts,
        width: size.width,
        height: size.depth,
        planeView: PlaneView.TOP
    });
    const rightPiece = new IsometricRectangle({
        ...opts,
        height: size.height,
        width: size.depth,
        planeView: PlaneView.FRONT
    });
    const leftPiece = new IsometricRectangle({
        ...opts,
        height: size.height,
        width: size.width,
        planeView: PlaneView.SIDE
    });
    topPiece.top = opts.posX + size.height;
    rightPiece.right = opts.posY + size.width;
    rightPiece.top = opts.posX;

    leftPiece.left = size.depth;
    leftPiece.top = opts.posX;

    return [ rightPiece, leftPiece, topPiece, ];
}

cube
    .addChildren(...Box({ height: 1, width: 10, depth: 5 }, {
        posX: 0,
        posY: 0,
        ...Color.Red,
        strokeWidth: 1.1
    }))
    .addChildren(...Box({ height: 1, width: 4, depth: 1 }, {
        posX: 1,
        posY: 0,
        ...Color.RichLemon,
        strokeWidth: 1.1
    }));
const container = SystemView.asComponent();

export const controller = View<ViewState>(({ state, update, use }) => Vertical(
    NavigationMenu({ state, update, use }),
    [
        HomeContent(state),
        Card(Custom(canvas))
            .addClass("grid")
            .setMargin("2.9rem 0")
    ][ state.menuState ?? 0 ],
    Spacer()
).setDirection("row")).change(({ update }) => {
    update({
        menuState: parseInt(new URLSearchParams(location.search).get("menuState") || "0")
    });
});

function HomeContent(state: Partial<ViewState>): Component | (Component | null)[] | null {
    return Grid(
        SmallCard(state.stats?.host.loadAverage[ 0 ].toFixed(2), "Load Average"),
        SmallCard(state.stats?.userCount.toString(), "Users"),
        SmallCard(timeSince(state.stats?.uptime), "Uptime"),
        SmallCard(bytes(state.stats?.host.heap), "Heap used"),
        SmallCard(state.stats ? `${state.stats?.host[ "sysMem%" ]}%` : undefined, "Memory"),
        [
            { width: 4 * 5, heigth: 3 },
            Card(container).addClass("continer-system-view")
        ],
        SmallCard("0", "Warnings"),
        SmallCard("0", "Errors")
    )
        .addClass("grid")
        .setGap("1.2rem")
        .setMargin("2.9rem 0")
        .setDynamicColumns(0, "1.5rem");
}
