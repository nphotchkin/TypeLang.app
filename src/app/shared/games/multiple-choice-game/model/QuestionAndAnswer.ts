import { WordTranslation } from "../../model/WordTranslation";

export class QuestionAndAnswers {
    
    question: WordTranslation;
    answers: WordTranslation[];

    constructor(question: WordTranslation, answers: WordTranslation[]) {
        this.question = question
        this.answers = answers
    }

    public isUsersAnswerCorrect(userAnswer: WordTranslation): boolean {
        return userAnswer.wordInEnglish === this.question.wordInEnglish
    }

}