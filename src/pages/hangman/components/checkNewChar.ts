import { gameData } from "../types";

export const checkNewChar = (game: gameData, input: HTMLInputElement) =>
{
    const valChar = input.value.toUpperCase();

    if (game.word.includes(valChar) && game.wordLookUp.indexOf(valChar) === -1)
    {
        game.checkedChars.push(valChar);
        game.wordLookUp = game.word.split('').map((real) => game.checkedChars.includes(real) ? real : "")

    } else if (game.checkedChars.indexOf(valChar) === -1)
    {
        game.checkedChars.push(valChar);
        game.failedAttemps++;
    }
};