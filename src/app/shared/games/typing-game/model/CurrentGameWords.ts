import { WordTranslation } from "./WordTranslation";

/**
 * Words for an instance of a given game instanstiated given a selected langage pack -> pack number.
 */
export class CurrentGameWords {

    sourceCountryCode: string;
    targetCountryCode: string;
    languagePackName: string;
    words: WordTranslation[];

    constructor(
        sourceCountryCode: string,   
        targetCountryCode: string,
        scenarioName: string,
        words: WordTranslation[]
    ) {
        this.sourceCountryCode = sourceCountryCode;
        this.languagePackName = scenarioName;
        this.targetCountryCode = targetCountryCode;
        this.words = words
    }

}


export enum LetterCorrectness {
    "CORRECT",
    "INCORRECT",
    "NOT_TYPED"
}
    