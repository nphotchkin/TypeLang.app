import { LanuagePack } from "./LanguagePack";
import { TypingGameStats } from "./TypingGameStats";

export class CurrentGameState {

    gameIsRunning: boolean = false
    isGameInitialized: boolean = false
    currentGameComplete = false
    currentLanguagePack: LanuagePack
    selectedPackNumber: number = 1
    selectedPackName: string = 'top-200-words'
    targetCountryCode: string = 'es'
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

}