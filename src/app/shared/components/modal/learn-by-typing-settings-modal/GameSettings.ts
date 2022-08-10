import { GameType } from "src/app/shared/games/model/enum/GameType"

export class GameSettings {

    gameType: GameType = GameType.TYPING_GAME
    languagePackName: string
    packNumber: number
    targetCountryCode: string

    constructor(languagePackName: string, packNumber: number, targetCountryCode: string) {
        this.languagePackName = languagePackName
        this.packNumber = packNumber
        this.targetCountryCode = targetCountryCode
    }

    static ofDefault(): GameSettings {
        return new GameSettings('top-200-words', 1, 'es')
    }

}