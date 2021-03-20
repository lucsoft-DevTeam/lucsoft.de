import { richCard, WebGenElements } from '@lucsoft/webgen';

import type { gameData } from '../types';

export const renderLoseView = (game: gameData, web: WebGenElements, resetGame: () => void) =>
    web.cards({ maxWidth: '30rem' }, richCard({
        title: 'You Lose!',
        content: `The word was ${game.word}. Hopefully you get it faster next round.`,
        buttons: [
            {
                color: "red",
                action: () => resetGame(),
                title: 'Go back'
            }
        ]
    }))