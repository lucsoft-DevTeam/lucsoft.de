export type aiData = {
    availableWords: string[];
    winningChance: number;
    highestProbability: {
        char: string
        count: number
        procent: number
    }[];
};