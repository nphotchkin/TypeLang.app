import { Just, Maybe } from "purify-ts";
import { Subject } from "rxjs";
import { CurrentGameWords } from "../typing-game/model/CurrentGameWords";
import { WordTranslation } from "../typing-game/model/WordTranslation";

export class MultipleChoiceGame {

    currentWordIndex: number = 0
    gameWords: CurrentGameWords

    onComplete = new Subject<boolean>(); // TODO: MISSING OBSERVABLES ON DESTROY

    questionAndAnswer = null

    constructor(gameWords: CurrentGameWords) { 
        this.gameWords = gameWords
        this.questionAndAnswer = this.newQuestionAndAnswers()
    }

    get currentQuestionAndAnswer() {
        return this.questionAndAnswer
    }

    checkAnswer(answer: WordTranslation): Maybe<Object> {

        console.log(answer)
        console.log(this.currentWord())

        if (answer.wordInEnglish === this.currentWord().wordInEnglish) {
            console.log("NEW QUESTIOH AND ANSWER")
            this.currentWordIndex ++
        
            if (this.currentWordIndex == this.gameWords.words.length) {
                this.onComplete.next(true)
                return Maybe.empty()
            }

            return Just(this.newQuestionAndAnswers())
        }
        return Maybe.empty()
    }

    private currentWord() {
       return this.gameWords.words[this.currentWordIndex]
    }


    private newQuestionAndAnswers() {
        return { // a question and answer
            question: this.currentWord(),
            answers: this.newAnswersOneOfIsCorrect() /// TODO THIS DOESNT CHECK UNIQUENESS
        }
    }

    private newAnswersOneOfIsCorrect() {
        let allAnswers = [];
        allAnswers.push(this.aRandomWordFromTargetCountryNotContaining())
        allAnswers.push(this.aRandomWordFromTargetCountryNotContaining())
        allAnswers.push(this.aRandomWordFromTargetCountryNotContaining())
        allAnswers.push(this.currentWord())

        var shuffled = this.shuffleArray(allAnswers)

        var answersArray = [];
        answersArray.push([shuffled[0], shuffled[1]])
        answersArray.push([shuffled[2], shuffled[3]])
        return answersArray
    }

    // it should actually implment aRandomWordFromTargetCountryNotContaining(array), make it clean though
        // ALSO you should check that there a no WRONG answers that are a duplicate of the correct answer.  
            // e.g. TO = A and A = A
                // So check that random.targetWord != to correct.targetWord
                // Make a utility class for this
    private aRandomWordFromTargetCountryNotContaining() {
        var randomIndex;
        do {
           randomIndex =  this.randomNumberBetween(0, this.gameWords.words.length);
        } while(randomIndex == this.currentWordIndex);

        return this.gameWords.words[randomIndex]
    }    

    /**
     * Returns a random number between min (inclusive) and max (exclusive)
     */
    private randomNumberBetween(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }

    /* Schwartzian transform */
    private shuffleArray(unshuffled) {
        return unshuffled
            .map(value => ({ value, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ value }) => value)
    }

}
  
  
