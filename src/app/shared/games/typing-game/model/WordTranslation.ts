
export class WordTranslation { // TODO: move this model to its own file

    wordInSourceCountryLanguage: string;
    wordInTargetCountryLanguage: string;
    wordInEnglish: string;
    voiceClipPlayBackLength: number;
    correctLettersForWord: string[]; // letter correctness -- TODO this should go in a different model which extends word translation

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