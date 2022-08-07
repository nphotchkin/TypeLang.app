
/**
* This collects data around the current game instance
* user to generate a TypingGameStats
* @see TypingGameStats
*/
 export class CurrentGameMetrics {

    totalWordsForGame: number
    incorrectWords: string [] = new Array()
  
    constructor(totalWordsForGame: number) {
        this.totalWordsForGame = totalWordsForGame
    }

}