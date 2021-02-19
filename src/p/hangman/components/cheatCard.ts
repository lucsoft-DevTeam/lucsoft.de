import { richCard } from "@lucsoft/webgen";
import { checkNewChar } from '../game';
import { gameData } from '../types';

export function generateCheatCard(ai: { availableWords: string[]; winningChance: number; highestProbability: { char: any; count: any; procent: number; }[]; }, input: HTMLInputElement, game: gameData, requestDraw: () => void): any
{
    return richCard({
        title: 'Hangman AI',
        content: [
            `CharProbabilityHighest: ${ai.highestProbability[ 0 ].char}`,
            `PossibleWordsCount: ${ai.availableWords.length}${ai.availableWords.length <= 3 ? ' (' + ai.availableWords.join(', ') + ')' : ''}`,
            `WinningChance: ${((1000 - ai.winningChance) / 1000).toFixed(3)},`,
            `<br>Ranking:`,
            `${ai.highestProbability.slice(0, 5).map(char => `<span style="width:6rem;display: inline-block;text-align:right; margin-right: .4rem;">${char.procent.toFixed(2)}%</span> ${char.char} (used ${char.count} times)`).join('<br>')}`
        ],
        buttons: [
            {
                color: 'normal',
                text: 'Predict Character',
                action: () =>
                {
                    input.value = ai.highestProbability[ 0 ].char;
                    checkNewChar(game, input, requestDraw);
                }
            }
        ]
    });
}
