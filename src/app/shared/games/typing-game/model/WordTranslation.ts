
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