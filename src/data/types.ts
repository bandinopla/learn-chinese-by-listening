export interface Line {
    ch: string;
    en: string;
    audio: string;
    source: string
};

export type CharacterInfo = {
    pinzi: string;
    means: string;
    radical: boolean;
};

export type CharacterDicc = { [key: string]: CharacterInfo } ;