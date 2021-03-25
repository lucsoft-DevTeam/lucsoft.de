import { createElement, richCard, span } from '@lucsoft/webgen';

import { getData } from '../ai/chardectect';
import { checkNewChar } from "../components/checkNewChar";
import { renderHangman } from '../components/svgRender';
import { getInputField } from "../input/inputField";
import { gameData } from '../types';

export const renderGameView = (game: gameData, requestDraw: (data?: Partial<{ state: "lose" | "win" | "active" | undefined; }>) => void) => {
    const form = document.createElement('form');
    const input = getInputField(() => {
        checkNewChar(game, input);
        microRerender()

    });
    form.append(input);
    form.onsubmit = (e) => e.preventDefault();

    const extraCards = [];

    let ai = getData(game);
    function microRerender() {
        input.value = "";
        contentThing.innerHTML = `<center style="font-size: 3rem; font-weight: 100;padding-bottom: 0.8rem;">${game.wordLookUp.map((real) => real.toUpperCase() == "" ? '_' : real).join(' ')}</center>`
        hangman.innerHTML = renderHangman(game.failedAttemps)
        attemps.innerText = game.checkedChars.join(' ');
        ai = getData(game);
        cheatData.innerHTML = [
            `CharProbabilityHighest: ${ai.highestProbability[ 0 ].char}`,
            `PossibleWordsCount: ${ai.availableWords.length}${ai.availableWords.length <= 3 ? ' (' + ai.availableWords.join(', ') + ')' : ''}`,
            `<br>Ranking:`,
            `${ai.highestProbability.slice(0, 5).map(char => `<span style="width:6rem;display: inline-block;text-align:right; margin-right: .4rem;">${char.procent.toFixed(2)}%</span> ${char.char} (used ${char.count} times)`).join('<br>')}`
        ].join('<br>')

        if (game.failedAttemps > 10) requestDraw({ state: "lose" })
        if (game.wordLookUp.join('') === game.word) requestDraw({ state: "win" });
    }
    const cheatData = span("");
    if (game.enableCheats) extraCards.push(richCard({
        title: 'Hangman AI',
        content: [
            cheatData
        ],
        buttons: [
            {
                color: 'normal',
                title: 'Predict Character',
                action: () => {
                    input.value = ai.highestProbability[ 0 ].char;
                    checkNewChar(game, input)
                    microRerender()
                }
            }
        ]
    }))
    input.autofocus = true;
    const contentThing = createElement('div');
    input.focus();
    const hangman = createElement('div')
    const attemps = span(game.checkedChars.join(' '))
    microRerender();
    return [ richCard({
        title: 'Hangman',
        content: [
            hangman,
            contentThing,
            attemps,
            form
        ]
    }), ...extraCards ];
};