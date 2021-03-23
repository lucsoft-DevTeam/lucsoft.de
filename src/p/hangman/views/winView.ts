import { richCard, WebGenElements } from '@lucsoft/webgen';

import type { gameData } from '../types';

export const renderWinView = (game: gameData, web: WebGenElements, resetGame: () => void) =>
    web.cards({ maxWidth: '30rem' }, richCard({
        title: 'You Won!',
        content: `The word was ${game.word}. You made ${game.failedAttemps} mistakes`,
        buttons: [
            {
                color: "red",
                action: () => resetGame(),
                title: 'Go back'
            }
        ]
    }))