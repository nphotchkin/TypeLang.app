import { Subject } from "rxjs";
import { Timer } from "./CountDownTimer";
import { CurrentGameMetrics } from "./model/CurrentGameMetrics";
import { CurrentGameWords, WordTranslation, LetterCorrectness } from "./model/CurrentGameWords";
import { TypingGameStats } from "./model/TypingGameStats";

export class TypingGame {

    public currentGameMetrics: CurrentGameMetrics;
    public gameWords: CurrentGameWords
    public currentWordIndex = 0
    public timer: Timer = new Timer()

    onComplete = new Subject<TypingGameStats>(); // TODO: MISSING OBSERVABLES ON DESTROY

    constructor(gameWords: CurrentGameWords) {
        this.gameWords = gameWords
        this.currentGameMetrics = new CurrentGameMetrics(this.gameWords.words.length)
    }

    get currentWordTranslation(): WordTranslation {
        return this.gameWords.words[this.currentWordIndex]
    }

    get wordsForExistingGame(): CurrentGameWords {
        return this.gameWords;
    }
    
    get metricsForCurrentGame() {
        return this.currentGameMetrics
    }

    get time() {  
        return this.timer.totalTimeElapsedSeconds
    }

    startGame() {
       this.timer.start()
    }

    /**
     * Returns a list of numbers that represents
     * the correct letters in the current word.
     */
    checkWord(input: string): boolean {
        this.updateLetterCorrectnessForCurrentWordGiven(input);
        if (this.currentWordTranslation.correctLettersForWord.includes("INCORRECT")) {
            this.onIncorrectWord(this.currentWordTranslation.wordInSourceCountryLanguage)
            return false
        } 

        return this.onCorrectWordMoveToNext(this.currentWordTranslation.correctLettersForWord)
    }

    onCorrectWordMoveToNext(letterCorrectnessArray) {
        let totalMissingOrInCorrect = letterCorrectnessArray.filter(entry => {
            return entry == LetterCorrectness[LetterCorrectness.INCORRECT] || entry == LetterCorrectness[LetterCorrectness.NOT_TYPED]
        }).length
        if (totalMissingOrInCorrect == 0) {
            if (this.currentWordIndex < this.gameWords.words.length) {
                console.log(this.currentWordIndex)
                console.log(this.gameWords.words.length)
                console.log("CORRECT WORD")
          
                this.currentWordIndex ++
                if (this.currentWordIndex == this.gameWords.words.length) {
                    this.onComplete.next(new TypingGameStats(this.currentGameMetrics, this.timer.totalTimeElapsedSeconds))
                }
                return true
            }
        }
        return false
    }

    resetGame() {
        this.currentGameMetrics = new CurrentGameMetrics(this.gameWords.words.length)
    }

    private updateLetterCorrectnessForCurrentWordGiven(input: string) {
        var index = 0
        var currentWord = this.currentWordTranslation
        var lettersInWordToType = currentWord.wordInSourceCountryLanguage.split('')
        
        for (let letter of lettersInWordToType) {
            var inputLetterForCurrentIndex = input.split('')[index]
            if (index >= input.length) break
            
            if (inputLetterForCurrentIndex == letter) {
                currentWord.correctLettersForWord[index] = LetterCorrectness[LetterCorrectness.CORRECT]
            } else {
                currentWord.correctLettersForWord[index] = LetterCorrectness[LetterCorrectness.INCORRECT]
            }
            index ++
        }
    }

    private onIncorrectWord(wordInSourceLanguage: string) { 
        var wordAlreadyAlreadyMarkedIncorrect = this.currentGameMetrics.incorrectWords.includes(wordInSourceLanguage)
        if (!wordAlreadyAlreadyMarkedIncorrect) {
            this.currentGameMetrics.incorrectWords.push(wordInSourceLanguage)
        }
    }

}

 
