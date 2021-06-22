import { Color, richCard } from '@lucsoft/webgen';

import type { gameData } from '../types';

export const renderWinView = (game: gameData, resetGame: () => void) => [
    richCard({
        title: 'You Won!',
        content: `The word was ${game.word}. You made ${game.failedAttemps} mistakes`,
        buttons: [
            {
                color: Color.Colored,
                action: () => resetGame(),
                title: 'Go back'
            }
        ]
    })
]
