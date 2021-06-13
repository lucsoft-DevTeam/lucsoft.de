export type gameData = {
    word: string;
    failedAttemps: number;
    wordLookUp: string[];
    checkedChars: string[];
    enableCheats: boolean;
};

export type ViewOptionsGame = {
    state: 'lose' | 'win' | 'active' | 'active-cheat';
};