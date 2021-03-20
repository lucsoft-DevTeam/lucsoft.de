import { WebGenElements, richCard } from '@lucsoft/webgen';

import { getData } from '../ai/chardectect';
import { generateCheatCard } from '../components/cheatCard';
import { checkNewChar } from "../components/checkNewChar";
import { renderHangman } from '../components/svgRender';
import { getInputField } from "../input/inputField";
import { gameData } from '../types';

export const renderGameView = (game: gameData, web: WebGenElements, requestDraw: () => void) =>
{
    const form = document.createElement('form');
    const input = getInputField(() => { checkNewChar(game, input); requestDraw() });
    form.append(input);
    form.onsubmit = (e) => e.preventDefault();

    const extraCards = [];

    if (game.enableCheats) extraCards.push(generateCheatCard(getData(game), input, game, requestDraw))

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