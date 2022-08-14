import { GameType } from "src/app/shared/games/model/enum/GameType"
import { LanguagePack } from "src/app/shared/games/model/LanguagePack"

export class GameSettings {

    selectedLanguagePack: LanguagePack
    gameType: GameType = GameType.TYPING_GAME
    packNumber: number
    targetCountryCode: string

    constructor(
        selectedLanguagePack: LanguagePack, 
        packNumber: number, 
        targetCountryCode: string, 
        gameType: GameType
    ) {
        this.selectedLanguagePack = selectedLanguagePack
        this.packNumber = packNumber
        this.targetCountryCode = targetCountryCode
        this.gameType = gameType
    }

}