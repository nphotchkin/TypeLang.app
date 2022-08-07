import { LanuagePack } from "../games/typing-game/model/LanguagePack";


export class LanguagePackResolver {

    public static resolve(scenarioName: string, targetCountry: string): Promise<LanuagePack> {
        return new Promise(function(resolve, reject){
            try {
                import(`src/assets/typing-game/language-pack/${scenarioName}/${targetCountry}.json`).then(m => {
                        var languagePack = m.default
                        resolve(languagePack)
                });
    
            } catch (error) {
                reject(error)
            }
        })
    }

}