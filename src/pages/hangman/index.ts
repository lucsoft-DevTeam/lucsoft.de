import { WebGen, richCard, Card, CommonCard, View } from '@lucsoft/webgen';
import { renderNavigation } from '../../components/navigation';

import { selectWord } from './components/svgRender';
import { renderGameView } from './views/gameView';
import { words } from './ai/lib';
import { gameData, ViewOptionsGame } from './types';
import { renderWinView } from './views/winView';
import { renderLoseView } from './views/loseView';

WebGen();

var game: gameData | undefined = undefined;

View<ViewOptionsGame>(({ state, update, draw }) => {
    draw(renderNavigation());
    const drawC = (data: CommonCard[]) => draw(Card({ maxWidth: findMaxWidthFromState(state) }, ...data));
    switch (state.state) {
        case 'active':
        case 'active-cheat':
            return drawC(renderGameView(game!, update))

        case 'lose':
            return drawC(renderLoseView(game!, () => { game = undefined; update({ state: undefined }) }))
        case 'win':
            return drawC(renderWinView(game!, () => { game = undefined; update({ state: undefined }) }))
        default:
            return drawC([ richCard({
                title: 'Start new Game!',
                content: 'Press the button to state a new Game of Hangman',
                buttons: [
                    {
                        action: () => startNewGame(true, update),
                        title: 'Play Game (Cheats)'
                    },
                    {
                        action: () => startNewGame(false, update),
                        title: 'Play Game'
                    }
                ]
            }) ]);
    }
})
    .setMaxWidth("80rem")
    .appendOn(document.body);

const startNewGame = (enableCheats: boolean, update: (data: Partial<ViewOptionsGame>) => void) => {
    const newWord = selectWord(words);
    game = {
        word: newWord,
        checkedChars: [],
        failedAttemps: 0,
        wordLookUp: newWord.split('').map(() => ''),
        enableCheats
    }
    update({ state: enableCheats ? 'active-cheat' : 'active' })
}

function findMaxWidthFromState({ state }: Partial<ViewOptionsGame>): string | undefined {
    if (state == undefined)
        return "40rem";
    else if (state === 'active-cheat')
        return "70rem";
    else if (state === 'active')
        return "30rem";
    else
        return "25rem";
}
