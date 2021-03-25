import { WebGen, richCard, Card, CommonCard } from '@lucsoft/webgen';
import { renderNavigation } from '../../components/navigation';

import { selectWord } from './components/svgRender';
import { renderGameView } from './views/gameView';
import { words } from './ai/lib';
import { gameData } from './types';
import { renderWinView } from './views/winView';
import { renderLoseView } from './views/loseView';

const web = WebGen();

var game: gameData | undefined = undefined;

const selectCards = (state: (undefined | 'lose' | 'win' | 'active' | 'active-cheat')): CommonCard[] => {
    switch (state) {
        case 'active':
        case 'active-cheat':
            return renderGameView(game!, body.redraw)

        case 'lose':
            return renderLoseView(game!, () => { game = undefined; body.redraw({ state: undefined }) })
        case 'win':
            return renderWinView(game!, () => { game = undefined; body.redraw({ state: undefined }) })
        default:
            return [ richCard({
                title: 'Start new Game!',
                content: 'Press the button to state a new Game of Hangman',
                buttons: [
                    {
                        color: "normal",
                        action: () => startNewGame(true),
                        title: 'Play Game (Cheats)'
                    },
                    {
                        color: "normal",
                        action: () => startNewGame(false),
                        title: 'Play Game'
                    }
                ]
            }) ];
    }
}

const body = web.render.toBody({ maxWidth: "80rem" }, {
    state: undefined as (undefined | 'lose' | 'win' | 'active' | 'active-cheat')
}, () => [
    renderNavigation(),
    (_, { state }) => Card({ maxWidth: state === undefined ? "40rem" : (state === 'active-cheat' ? "70rem" : (state === 'active' ? "30rem" : "25rem")) }, ...selectCards(state))
]);

const startNewGame = (enableCheats: boolean) => {
    const newWord = selectWord(words);
    game = {
        word: newWord,
        checkedChars: [],
        failedAttemps: 0,
        wordLookUp: newWord.split('').map(() => ''),
        enableCheats
    }
    body.redraw({ state: enableCheats ? 'active-cheat' : 'active' })
}