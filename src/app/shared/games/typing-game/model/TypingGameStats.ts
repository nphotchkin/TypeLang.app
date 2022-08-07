import { CurrentGameMetrics } from "./CurrentGameMetrics"

/**
 * This class respresents an extended version of `CurrentGameMetrics`, 
 * given metrics about the current game calculate some statistics.
 */
export class TypingGameStats {

    incorrectWords: string [] = new Array()
    totalWordsForCurrentGame: number
    totalTimeTypingInSeconds: number
   
    // Computed values
    accuracyPercentage: number

    constructor(currentGameMetrics: CurrentGameMetrics, totalTimeTypingInSeconds: number) {
        this.incorrectWords = currentGameMetrics.incorrectWords
        this.totalWordsForCurrentGame = currentGameMetrics.totalWordsForGame
        this.totalTimeTypingInSeconds = totalTimeTypingInSeconds
        this.accuracyPercentage = 100 - ((this.incorrectWords.length / this.totalWordsForCurrentGame) * 100) 
    }

}