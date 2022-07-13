import { EventEmitter } from "@angular/core";
import { Subject } from "rxjs";
import { CurrentGameWords, WordTranslation, LetterCorrectness } from "./model/CurrentGameWords";

export class TypingGame {

    private gameWords: CurrentGameWords
    private currentWordIndex = 0

    onComplete = new Subject(); // TODO: MISSING OBSERVABLES ON DESTROY

    constructor(gameWords: CurrentGameWords) {
        this.gameWords = gameWords
    }

    get currentWordTranslation(): WordTranslation {
        return this.gameWords.words[this.currentWordIndex]
    }

    get wordsForExistingGame(): CurrentGameWords {
        return this.gameWords;
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
            return entry == LetterCorrectness[LetterCorrectness.INCORRECT] || entry == LetterCorrectness[LetterCorrectness.NOT_TYPED]
        }).length
        if (totalMissingOrInCorrect == 0) {
            if (this.currentWordIndex < this.gameWords.words.length) {
                this.currentWordIndex ++

                if (this.currentWordIndex == this.gameWords.words.length) {
                    this.onComplete.next(true)
                }
                return true
            }
        }
        return false
    }

    private updateLetterCorrectnessForCurrentWordGiven(input: string) {
        var index = 0
        var currentWord = this.currentWordTranslation

        currentWord.wordInSourceCountryLanguage.split('').forEach(letterInCurrentWord => {
            var inputLetterForCurrentIndex = input.split('')[index]
            if (inputLetterForCurrentIndex == letterInCurrentWord) {
                currentWord.correctLettersForWord[index] = LetterCorrectness[LetterCorrectness.CORRECT]
            } else {
                currentWord.correctLettersForWord[index] = LetterCorrectness[LetterCorrectness.INCORRECT]
            }
            index ++
        })
    }

}

 
