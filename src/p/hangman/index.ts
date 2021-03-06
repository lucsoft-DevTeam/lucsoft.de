import { WebGen, richCard, SupportedThemes } from '@lucsoft/webgen';
import { renderNavigation } from '../../components/navigation';

import { selectWord } from './components/svgRender';
import { handleGameUpdate } from './game';
import { words } from './ai/lib';
import { gameData } from './types';
import { handleGameWin } from './components/winScreen';
import { handleGameLose } from './components/loseScreen';

const web = new WebGen();
var game: gameData | undefined = undefined;
const body = web.elements.body({ maxWidth: "80rem" });

renderNavigation(body);
const shellElement = document.createElement('div');
body.custom(shellElement);
var shell = web.elements.custom(shellElement);
const draw = () =>
{
    shellElement.innerHTML = "";
    console.log(game);
    if (game == undefined)
    {
        shell.cards({ maxWidth: "40rem" }, richCard({
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
        }));
    }
    else if (game.failedAttemps > 10)
        handleGameLose(game, shell, () => { game = undefined; draw(); })
    else if (game.wordLookUp.join('') === game.word)
        handleGameWin(game, shell, () => { game = undefined; draw(); });
    else
        handleGameUpdate(game, shell, () => draw());
};
const startNewGame = (enableCheats: boolean) =>
{
    const newWord = selectWord(words);
    game = {
        word: newWord,
        checkedChars: [],
        failedAttemps: 0,
        wordLookUp: newWord.split('').map(() => ''),
        enableCheats
    }
    draw();
};

draw();
web.style.handleTheme(SupportedThemes.auto);