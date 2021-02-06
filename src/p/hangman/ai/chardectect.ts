import { words } from './lib';
import { gameData } from '../types';

export const getData = (game: gameData) =>
{
    const length = game.word.length;
    let trimWords = words.filter(x => x.length === length);
    if (game.wordLookUp)
        trimWords = trimWords.filter(x =>
        {
            if (game.wordLookUp.join('') == "")
                return true;
            const wordsplit = x.split('');
            let error = false;
            for (let index = 0; index < wordsplit.length; index++)
            {
                const char = wordsplit[ index ];
                const realchar = game.wordLookUp[ index ];
                if (realchar != "")
                    if (realchar.toUpperCase() !== char.toUpperCase())
                        error = true;
            }
            return !error;
        })
    let chartCountMap: any = {
        A: 0, B: 0, C: 0, D: 0, E: 0, F: 0, G: 0, H: 0, I: 0, J: 0, K: 0, L: 0, M: 0, N: 0, O: 0, P: 0, Q: 0, R: 0, S: 0, T: 0, U: 0, V: 0, W: 0, X: 0, Y: 0, Z: 0
    };
    let charcount = 0
    trimWords.forEach(x => x.toUpperCase().split('').forEach((char) => { if (game.wordLookUp.indexOf(char) === -1 && game.checkedChars.indexOf(char) === -1) { chartCountMap[ char ]++; charcount++; } }));
    var sortedCharCount = [];

    for (var char in chartCountMap)
        sortedCharCount.push([ char, chartCountMap[ char ] ]);

    sortedCharCount.sort((a, b) => b[ 1 ] - a[ 1 ]);

    return {
        availableWords: trimWords,
        winningChance: charcount / length,
        highestProbability: sortedCharCount.filter(x => x[ 1 ] !== 0).map((x) => ({ char: x[ 0 ], count: x[ 1 ], procent: (x[ 1 ] / charcount) * 100 }))
    }
}