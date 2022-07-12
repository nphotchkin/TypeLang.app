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
        voiceClipPlayBackLength: number,
        correctLettersForWord: string[]
    ) {
        this.wordInSourceCountryLanguage = wordInSourceCountryLanguage;
        this.wordInTargetCountryLanguage = wordInTargetCountryLanguage;
        this.wordInEnglish = wordInEnglish;
        this.voiceClipPlayBackLength = voiceClipPlayBackLength;
        this.correctLettersForWord = correctLettersForWord
    }


}

export enum LetterCorrectness {
    "CORRECT",
    "INCORRECT",
    "NOT_TYPED"
}
    