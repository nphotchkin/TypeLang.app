
export class GameSettings {

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