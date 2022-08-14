import { lazy } from "purify-ts";
import { LanguagePackService } from "src/app/shared/service/language-pack.service";
import { LanguagePack } from "./LanguagePack";
import { TypingGameStats } from "../typing-game/model/TypingGameStats";

export class CurrentGameState {

    gameIsRunning: boolean = false
    isGameInitialized: boolean = false
    currentGameComplete = false // TODO REMOVE PROP MANAGED BY A COMPONENT
    currentLanguagePack: LanguagePack
    statsForRecentGame: TypingGameStats

    constructor(languagePack: LanguagePack) {
        this.currentLanguagePack = languagePack
    }

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