import { words } from './lib';
import { gameData } from '../types';
import { aiData } from "./aiType";

export const getData = (game: gameData): aiData =>
{
    let trimWords = words.filter(x => x.length === game.word.length);
    if (game.wordLookUp)
        trimWords = trimWords.filter(x =>
        {
            if (game.wordLookUp.join('') == "") return true;
            const wordsplit = x.split('');
            let error = false;
            for (let index = 0; index < wordsplit.length; index++)
            {
                const char = wordsplit[ index ];
                const realchar = game.wordLookUp[ index ];
                if (realchar != "" && (realchar.toUpperCase() !== char.toUpperCase())) error = true;
            }
            return !error;
        })
    const chartCountMap = Array.from({ length: 26 }, () => 0)
    let charcount = 0

    trimWords.forEach(x => x.toUpperCase().split('').forEach((char) =>
    {
        if (game.wordLookUp.indexOf(char) === -1 && game.checkedChars.indexOf(char) === -1)
            chartCountMap[ char.charCodeAt(0) - 65 ]++; charcount++;

    }));
    return {
        availableWords: trimWords,
        winningChance: charcount / length,
        highestProbability: chartCountMap.map((x, i) => ({
            char: String.fromCharCode(65 + i),
            count: x,
            procent: (x / charcount) * 100
        })).sort((a, b) => b.count - a.count).filter(x => x.count !== undefined)
    }
}