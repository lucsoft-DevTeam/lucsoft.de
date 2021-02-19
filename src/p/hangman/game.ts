import { WebGenElements, richCard } from '@lucsoft/webgen';

import { getData } from './ai/chardectect';
import { generateCheatCard } from './components/cheatCard';
import { renderHangman } from './components/svgRender';
import { gameData } from './types';

export const handleGameUpdate = (game: gameData, web: WebGenElements, requestDraw: () => void) =>
{
    const form = document.createElement('form');
    const input = document.createElement('input');
    input.maxLength = 1;
    input.style.maxWidth = "26.3rem";
    input.style.margin = "0.8rem auto";
    input.classList.add('maxWidth', 'default');
    input.placeholder = "Type a character";
    form.append(input);
    form.onsubmit = (e) => e.preventDefault();
    input.addEventListener("keyup", (event) => { if (event.key.match(/^[a-zA-Z]$/)) checkNewChar(game, input, requestDraw); else input.value = "" });
    const ai = getData(game);
    const extraCards = [];
    if (game.enableCheats)
        extraCards.push(generateCheatCard(ai, input, game, requestDraw))
    web.cards({ maxWidth: !game.enableCheats ? '40rem' : undefined }, richCard({
        title: 'Hangman',
        content: [
            renderHangman(game.failedAttemps),
            `<center style="font-size: 3rem; font-weight: 100;padding-bottom: 0.8rem;">${game.wordLookUp.map((real) => real.toUpperCase() == "" ? '_' : real).join(' ')}</center>`,
            game.checkedChars.join(' '),
            form
        ]
    }), ...extraCards);

    input.focus();
};

export const checkNewChar = (game: gameData, input: HTMLInputElement, requestDraw: () => void) =>
{
    const valChar = input.value.toUpperCase();

    if (game.word.includes(valChar) && game.wordLookUp.indexOf(valChar) === -1)
    {
        game.checkedChars.push(valChar);
        game.wordLookUp = game.word.split('').map((real) => game.checkedChars.includes(real) ? real : "")
    } else
    {
        if (game.checkedChars.indexOf(valChar) === -1)
        {
            game.checkedChars.push(valChar);
            game.failedAttemps++;
        }
    }
    requestDraw();
};