

export class GameWords {

    sourceCountryCode: string;

    targetCountryCode: string;

    scenarioName: string;

    words: WordTranslation[];

    constructor(
        sourceCountryCode: string,   
        targetCountryCode: string,
        scenarioName: string,
        words: WordTranslation[]
    ) {
        this.sourceCountryCode = sourceCountryCode;
        this.targetCountryCode = targetCountryCode;
        this.scenarioName = scenarioName;
        this.words = words;
    }

}

export class WordTranslation {

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
        this.initalizeCorrectnessArray();
    }

    private initalizeCorrectnessArray() {
        var correctnessArray = [];
        for (var i = 0; i < this.wordInSourceCountryLanguage.length; i++) {
            correctnessArray.push(LetterCorrectness[LetterCorrectness.NOT_TYPED]);
        }
        this.correctLettersForWord = correctnessArray;
    }

}


export enum LetterCorrectness {
    "CORRECT",
    "INCORRECT",
    "NOT_TYPED"
}
    