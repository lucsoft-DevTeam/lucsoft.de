import { Color, richCard } from '@lucsoft/webgen';

import type { gameData } from '../types';

export const renderLoseView = (game: gameData, resetGame: () => void) => [
    richCard({
        title: 'You Lose!',
        content: `The word was ${game.word}. Hopefully you get it faster next round.`,
        buttons: [
            {
                color: Color.Critical,
                action: () => resetGame(),
                title: 'Go back'
            }
        ]
    })
]