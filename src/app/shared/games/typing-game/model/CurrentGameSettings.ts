import { LanuagePack } from "./LanguagePack";
import { TypingGameStats } from "./TypingGameStats";

export class CurrentGameState {

    gameIsRunning: boolean = false
    isGameInitialized: boolean = false
    currentGameComplete = false
    currentLanguagePack: LanuagePack
    statsForRecentGame: TypingGameStats

    resetGame() {
        this.gameIsRunning = false
        this.isGameInitialized = false
        this.currentGameComplete = false
    }

    gameInitialized() {
        this.gameIsRunning = true
        this.isGameInitialized = true
    }

    onEndGameEvent(typingGameStats: TypingGameStats) {
        this.currentGameComplete = true
        this.gameIsRunning = false
        this.statsForRecentGame = typingGameStats
    }

}