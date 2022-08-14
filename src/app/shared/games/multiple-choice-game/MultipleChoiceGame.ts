import { unix } from "ngx-bootstrap/chronos/utils/date-getters";
import { Just, Maybe } from "purify-ts";
import { Subject } from "rxjs";
import { CurrentGameWords } from "../model/CurrentGameWords";
import { WordTranslation } from "../model/WordTranslation";
import { UniqueMultipleChoiceGenerator } from "./util/UniqueMultipleChoiceGenerator";
import { QuestionAndAnswers } from "./model/QuestionAndAnswer";

export class MultipleChoiceGame {

    currentWordIndex: number = 0
    gameWords: CurrentGameWords
    currentQuestionAndAnswer: QuestionAndAnswers = undefined
    onComplete = new Subject<boolean>()

    constructor(gameWords: CurrentGameWords) { 
        this.gameWords = gameWords
        this.currentQuestionAndAnswer = this.newQuestionAndAnswers()
    }

    getCurrentQuestionAndAnswer() {
        return this.currentQuestionAndAnswer
    }

    checkAnswer(answer: WordTranslation): Maybe<QuestionAndAnswers> {
        if (this.currentQuestionAndAnswer.isUsersAnswerCorrect(answer)) {
            this.currentWordIndex ++
            if (this.isLastWordForCurrentGame()) {
                this.onComplete.next(true)
                return Maybe.empty()
            }
            this.currentQuestionAndAnswer = this.newQuestionAndAnswers()
            return Just(this.currentQuestionAndAnswer)
        }
        return Maybe.empty()
    }

    private currentWord() {
       return this.gameWords.words[this.currentWordIndex]
    }

    private newQuestionAndAnswers(): QuestionAndAnswers {
        var uniqueMultipleChoiceGenerator = new UniqueMultipleChoiceGenerator(
            this.currentWord(), this.gameWords.words
        );
        return uniqueMultipleChoiceGenerator.generate();
    }

    private isLastWordForCurrentGame(): boolean {
        return this.currentWordIndex == this.gameWords.words.length
    }

}
  
  
