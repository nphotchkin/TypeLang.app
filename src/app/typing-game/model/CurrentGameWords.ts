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
        this.targetCountryCode = targetCountryCode;
        this.languagePackName = scenarioName;
        this.words = words;
    }

}

export class WordTranslation { // TODO: move this model to its own file

    wordInSourceCountryLanguage: string;
    wordInTargetCountryLanguage: string;
    wordInEnglish: string;
    voiceClipPlayBackLength: number;
    correctLettersForWord: string[]; // letter correctness

    constructor( 
        wordInSourceCountryLanguage: string,
        wordInTargetCountryLanguage: string,
        wordInEnglish: string,
        voiceClipPlayBackLength: number
    ) {
        this.wordInSourceCountryLanguage = wordInSourceCountryLanguage;
        this.wordInTargetCountryLanguage = wordInTargetCountryLanguage;
        this.wordInEnglish = wordInEnglish;
        this.voiceClipPlayBackLength = voiceClipPlayBackLength;
    }

}

export enum LetterCorrectness {
    "CORRECT",
    "INCORRECT",
    "NOT_TYPED"
}
    