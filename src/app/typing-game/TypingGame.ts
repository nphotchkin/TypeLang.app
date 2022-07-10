import { TranslationFileResolver } from "../shared/util/TranslationFileResolver";
import { GameWords, WordTranslation, LetterCorrectness } from "./model/GameWords";

export class TypingGame {

    gameInitialized: boolean = false;

    gameWords: GameWords;

    private currentWordIndex = 0

    constructor() {
        this.initalize()
    }

    initalize() {
        TranslationFileResolver.resolve(`top-200-words`).then(gameWords => {
            this.gameWords = gameWords;
            this.gameInitialized = true;
        })
    }

    get currentWordTranslation(): WordTranslation {
        return this.gameWords.words[this.currentWordIndex]
    }

    initalizeCorrectnessArray(word: WordTranslation) {
        var correctnessArray = [];
        for (var i = 0; i < word.wordInSourceCountryLanguage.length; i++) {
            correctnessArray.push(LetterCorrectness[LetterCorrectness.NOT_TYPED]);
        }
        word.correctLettersForWord = correctnessArray;
    }

    /**
     * Returns a list of numbers that represents
     * the correct letters in the current word.
     */
    checkWord(input: string): boolean {
        this.updateLetterCorrectnessForCurrentWordGiven(input);
        return this.onCorrectWordMoveToNext(this.currentWordTranslation.correctLettersForWord)
    }

    onCorrectWordMoveToNext(letterCorrectnessArray) {
        let totalMissingOrInCorrect = letterCorrectnessArray.filter(entry => {
            return entry == LetterCorrectness[LetterCorrectness.INCORRECT] || entry == LetterCorrectness[LetterCorrectness.NOT_TYPED];
        }).length
        if (totalMissingOrInCorrect == 0) {
            if (this.currentWordIndex < this.gameWords.words.length) {
                this.currentWordIndex ++
                return true
            }
        }
        return false
    }

    private updateLetterCorrectnessForCurrentWordGiven(input: string) {
        var index = 0;
        var currentWord = this.currentWordTranslation;

        currentWord.wordInSourceCountryLanguage.split('').forEach(letterInCurrentWord => {
            var inputLetterForCurrentIndex = input.split('')[index];
            if (inputLetterForCurrentIndex == letterInCurrentWord) {
                currentWord.correctLettersForWord[index] = LetterCorrectness[LetterCorrectness.CORRECT]
            } else {
                currentWord.correctLettersForWord[index] = LetterCorrectness[LetterCorrectness.INCORRECT]
            }
            index ++;
        })
    }

}

 
