import { cards, WebGenElements } from '@lucsoft/webgen';

import type { gameData } from '../types';

export const handleGameLose = (game: gameData, web: WebGenElements, resetGame: () => void) =>
{
    web.cards({ maxWidth: '30rem' }, cards.richCard({
        title: 'You Lose!',
        content: `The word was ${game.word}. Hopefully you get it faster next round.`,
        buttons: [
            {
                color: "red",
                action: () => resetGame(),
                text: 'Go back'
            }
        ]
    }))
};