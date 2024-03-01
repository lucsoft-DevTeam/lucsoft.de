import { chunk } from "https://deno.land/std@0.218.0/collections/chunk.ts";
import { union } from "https://deno.land/std@0.218.0/collections/union.ts";

export function rotateMatrixN90D(matrix: number[][]) {
    return matrix[0].map((_, index) => matrix.map((row) => row[index]));
}
export function createNormilizer(rotatedN90: boolean, indexAsRotatedMartix: number[]) {
    return function findIndex(index: number) {
        return rotatedN90 ? indexAsRotatedMartix[index] : index;
    };
}
export function rotatedNormalIndexArray(size: number) {
    return union(...rotateMatrixN90D(chunk(new Array(size).fill(0).map((_, index) => index), Math.sqrt(size))));
}
