import { LanguagePack } from "../games/model/LanguagePack";


export class LanguagePackResolver {

    public static resolve(scenarioName: string, targetCountry: string): Promise<LanguagePack> {
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