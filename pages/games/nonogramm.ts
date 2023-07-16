import { chunk } from "https://deno.land/std@0.167.0/collections/chunk.ts";
import { createElement, Custom, PlainText, Vertical, View, WebGen } from "webgen/mod.ts";
import '../../assets/nonogramm.css';
import { createNormilizer, rotatedNormalIndexArray, rotateMatrixN90D } from "../../helper/matrixMath.ts";
import { getDefault } from "../../helper/rendering.ts";
import games from "./games.json";

const wg = WebGen();
// deno-fmt-ignore
const template = games.mid[ "sugar cane" ];
// const template = [
//     1, 1, 1, 1, 1, 1, 1, 1,
//     1, 0, 1, 1, 1, 0, 1, 1,
//     1, 0, 0, 1, 1, 0, 0, 1,
//     1, 1, 1, 0, 1, 0, 1, 0,
//     1, 1, 1, 1, 1, 1, 1, 1,
//     1, 0, 1, 1, 1, 0, 1, 1,
//     1, 0, 0, 0, 1, 0, 0, 1,
//     1, 0, 1, 0, 1, 0, 1, 0,
// ];

const sqrtSize = Math.sqrt(template.length);
const game = new Array(template.length).fill(0);
const indexAsRotatedMartix = rotatedNormalIndexArray(template.length);

const canvas = createElement("canvas");
const view = View<{ health?: string; }>(({ state }) => Vertical(
    PlainText(state.health ?? "").addClass("health"),
    Custom(canvas)
)).addClass("shell").appendOn(document.body);
const gapLength = 50;
const gapHeight = 50;
const ctx = canvas.getContext("2d")!;
const size = 50;
canvas.height = sqrtSize * size * 1.1 + gapHeight;
canvas.width = sqrtSize * size * 1.1 + gapLength;
document.querySelector<HTMLDivElement>(".shell")!.style.width = canvas.width + "px";
let drag = false;
canvas.onmousedown = () => drag = true;
canvas.onmouseup = () => drag = false;
canvas.onmousemove = (env) => drag ? canvas.onclick?.(env) : null;
canvas.onclick = (env) => {
    if (health === 0) return;
    const rect = canvas.getBoundingClientRect();
    const x = Math.floor(env.clientX - rect.left - gapLength);
    const y = Math.floor(env.clientY - rect.top - gapHeight);
    if (x <= 0 || y <= 0) return;
    const xIndex = Math.ceil(x / (size * 1.1));
    const yIndex = Math.ceil(y / (size * 1.1));
    game[ (xIndex - 1) + (yIndex - 1) * sqrtSize ] = 1;
    if (template[ (xIndex - 1) + (yIndex - 1) * sqrtSize ] === 0)
        health--;
    update();
};
ctx.fillStyle = getDefault(wg.theme);
ctx.font = "10px Roboto";
let leftRow = chunk(template, sqrtSize).map((row, rowIndex) => combineRightWhile(row, rowIndex));
let topRow = rotateMatrixN90D(chunk(template, sqrtSize)).map((row, rowIndex) => combineRightWhile(row, rowIndex, true));
const linesDoneLeft: number[] = [];
const linesDoneTop: number[] = [];
let health = 3;
const denormalIndex = createNormilizer(true, indexAsRotatedMartix);
function update() {
    // Calculate Numbers
    leftRow = chunk(template, sqrtSize).map((row, rowIndex) => combineRightWhile(row, rowIndex));
    topRow = rotateMatrixN90D(chunk(template, sqrtSize)).map((row, rowIndex) => combineRightWhile(row, rowIndex, true));
    leftRow.forEach((data, index) => {
        if (linesDoneLeft.includes(index) || !data.every(([ _, valid ]) => valid)) return;
        console.log("Completed Line", index, "L!");
        new Array(sqrtSize).fill(1).forEach((_, count) => game[ index * sqrtSize + count ] = 1);
        linesDoneLeft.push(index);
    });

    topRow.forEach((data, index) => {
        if (linesDoneTop.includes(index) || !data.every(([ _, valid ]) => valid)) return;
        console.log("Completed Line", index, "T!");
        new Array(sqrtSize).fill(1).forEach((_, count) => game[ denormalIndex(index * sqrtSize + count) ] = 1);
        linesDoneTop.push(index);
    });

    //Render
    view.unsafeViewOptions().update({ health: health === 0 ? "You Lost!" : "❤️".repeat(health) });
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    template.forEach((grid, index) => {
        const x = (index % sqrtSize) * size * 1.1 + gapLength;
        const y = gapHeight + Math.floor(index / sqrtSize) * size * 1.1;
        const padding = size * 0.75;
        ctx.fillStyle = game[ index ] & grid ? "#2e78f0" : "#0d51bf50";
        ctx.fillRect(
            x,
            y,
            size,
            size,
        );
        if (game[ index ] && !grid) {
            ctx.strokeStyle = "#2e78f0";
            ctx.lineWidth = 3.5;
            ctx.lineCap = "round";
            ctx.beginPath();
            ctx.moveTo(x + padding, y + padding);
            ctx.lineTo(x + size - padding, y + size - padding);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(x + padding, y + (size - padding));
            ctx.lineTo(x + size - padding, y + padding);
            ctx.stroke();
        }
    });

    leftRow.forEach(renderNumbers(ctx));
    topRow.forEach(renderNumbers(ctx, true));
}
update();

function renderNumbers(ctx: CanvasRenderingContext2D, rotated = false): (value: [ count: number, completed: boolean ][], index: number, array: [ count: number, completed: boolean ][][]) => void {
    return (row, rowIndex) => {
        row.forEach(([ count, valid ], charIndex) => {
            if (rotated) {
                ctx.fillStyle = valid ? "gray" : getDefault(wg.theme);
                ctx.fillText(
                    count.toString(),
                    gapLength + rowIndex * size * 1.1 + (size / 2) + 1,
                    gapHeight - 10 - 10 * charIndex,
                );
            } else {
                ctx.textAlign = "right";
                ctx.fillStyle = valid ? "gray" : getDefault(wg.theme);
                ctx.fillText(
                    count.toString(),
                    gapLength - 10 - (charIndex * 8.5),
                    rowIndex * size * 1.1 + (size / 2) + 5 + gapHeight,
                );
            }
        });
    };
}

function combineRightWhile(row: number[], rowIndex: number, rotatedN90 = false): [ count: number, completed: boolean ][] {
    const counter: number[] = [ 0 ];
    const offset = rowIndex * sqrtSize;
    const normi = createNormilizer(rotatedN90, indexAsRotatedMartix);
    const completed: boolean[] = [ !!game[ normi(offset) ] ];
    row.forEach((x, itemIndex) => {
        if (counter[ counter.length - 1 ] !== 0) {
            if (x) {
                {
                    //AfterFirstElement
                    counter[ counter.length - 1 ]++;
                    completed[ completed.length - 1 ] = game[ normi(offset + itemIndex) ]
                        ? completed[ completed.length - 1 ]
                        : false;
                }
            } else {
                //Completed
                counter.push(0);
                completed.push(false);
            }
        } else {
            // firstElement
            completed[ completed.length - 1 ] = !!game[ normi(offset + itemIndex) ];
            counter[ counter.length - 1 ] = x;
        }
    });

    if (!counter.at(-1)) {
        counter.pop();
    }
    return counter.map((x, index): [ count: number, completed: boolean ] => [ x, completed[ index ] ]).reverse();
}
