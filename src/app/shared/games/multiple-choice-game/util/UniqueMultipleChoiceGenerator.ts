import { QuestionAndAnswers } from "../model/QuestionAndAnswer";
import { WordTranslation } from "../../typing-game/model/WordTranslation";

export class UniqueMultipleChoiceGenerator {

    private question: WordTranslation;
    private allTranslations: WordTranslation[];

    private uniqueQuestionsAndAnsers: QuestionAndAnswers;

    constructor(question: WordTranslation, allTranslations: WordTranslation[]) {
        this.question = question
        this.allTranslations = allTranslations
        this.uniqueQuestionsAndAnsers = new QuestionAndAnswers(question, [])
    }

    generate(): QuestionAndAnswers {
        return this.newQuestionAndAnswers()
    }

    private newQuestionAndAnswers(): QuestionAndAnswers {
        this.uniqueQuestionsAndAnsers = new QuestionAndAnswers(this.question, [])
        this.newAnswersOneOfIsCorrect()
        return this.uniqueQuestionsAndAnsers
    }

    public newAnswersOneOfIsCorrect() {
        this.uniqueQuestionsAndAnsers.answers.push(this.aUniqueWord())
        this.uniqueQuestionsAndAnsers.answers.push(this.aUniqueWord())
        this.uniqueQuestionsAndAnsers.answers.push(this.aUniqueWord())
        this.uniqueQuestionsAndAnsers.answers.push(this.question)
        this.uniqueQuestionsAndAnsers.answers = this.shuffleArray(this.uniqueQuestionsAndAnsers.answers)
    }

    private aUniqueWord() {
        var randomIndex;
        var aRandomWord;
        do { 
           randomIndex =  this.randomNumberBetween(0, this.allTranslations.length);
           aRandomWord = this.allTranslations[randomIndex]

        } while(this.isTranslationTheQuestionOrAlreadyPresent(aRandomWord));

        return aRandomWord
    }    

    private isTranslationTheQuestionOrAlreadyPresent(wordTranslation: WordTranslation): boolean {
        // is the translation the question
        if (this.isTranslationLeftRightEqual(this.question, wordTranslation)) return true
        if (this.isAlreadyAnAnswer(wordTranslation)) return true
    }

    private isTranslationLeftRightEqual(a: WordTranslation, b: WordTranslation): boolean {
        // Consider word uniqueness as it doesn't match left / right translation or the english translation.
        if (a.wordInTargetCountryLanguage == b.wordInTargetCountryLanguage) {
            return true;
        }
        if (a.wordInSourceCountryLanguage == b.wordInSourceCountryLanguage) {
            return true;
        }
        if (a.wordInEnglish == b.wordInEnglish) {
            return true;
        }
        return false;   
    }

    private isAlreadyAnAnswer(wordTranslation: WordTranslation): boolean {
        // we don't already have this word as an answer
        for (var i = 0; i < this.uniqueQuestionsAndAnsers.answers.length; i++) {
            // is already a question (Defensive programming)
            if (this.isTranslationLeftRightEqual(this.uniqueQuestionsAndAnsers.question, wordTranslation)) {
                return true
            }
            // is already an answer
            if (this.isTranslationLeftRightEqual(wordTranslation, this.uniqueQuestionsAndAnsers.answers[i])) {
                return true
            }
        }
        return false
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

