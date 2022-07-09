import { GameWords, WordTranslation, LetterCorrectness } from "./model/GameWords";

export class TypingGame {

    gameWords: GameWords

    private currentWordIndex = 0

    constructor() {
        this.initalize()
    }

    initalize() {
        this.initNewGameFormat();
        console.warn(this.gameWords)
    }

    get currentWordTranslation(): WordTranslation {
        return this.gameWords.words[this.currentWordIndex]
    }

    /**
     * Returns a list of numbers that represents
     * the correct letters in the current word.
     */
    checkWord(input: string): boolean {

        var currentWord = this.currentWordTranslation;

        var index = 0;

        currentWord.wordInSourceCountryLanguage.split('').forEach(letterInCurrentWord => {

            var inputLetterForCurrentIndex = input.split('')[index];

            if (inputLetterForCurrentIndex == letterInCurrentWord) {
                currentWord.correctLettersForWord[index] = LetterCorrectness[LetterCorrectness.CORRECT]
            } else {
                currentWord.correctLettersForWord[index] = LetterCorrectness[LetterCorrectness.INCORRECT]
            }
            index ++;

        })


        return this.onCorrectWordMoveToNext(currentWord.correctLettersForWord)
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


    initNewGameFormat() {
        
        var wordTranslations = []

        var translation = new WordTranslation(
            "test", "prueba", "test", 10
        )
        var translation2 = new WordTranslation(
            "country", "país", "country", 10
        )
        wordTranslations.push(translation2)
        wordTranslations.push(translation)
        var words = new GameWords(
            "GB",
            "ES",
            "top-200-words",
            wordTranslations
        )
        this.gameWords = words
    }

}
