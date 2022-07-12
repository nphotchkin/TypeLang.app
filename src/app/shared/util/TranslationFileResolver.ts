import { CurrentGameWords, LetterCorrectness, WordTranslation } from "src/app/typing-game/model/CurrentGameWords";

export class TranslationFileResolver {

    public static resolve(scenarioName: string): Promise<CurrentGameWords> {
        return new Promise(function(resolve, reject){
            try {
                var gameWords
                import(`src/assets/typing-game/language-files/scenarios/${scenarioName}.json`).then(m => {
                        gameWords = m.default;
                        gameWords.words.forEach(word=>{
                            TranslationFileResolver.initalizeCorrectnessArray(word)
                        })
                        resolve(gameWords)
                });
    
            } catch (error) {
                reject(error)
            }
        })
    }

    private static initalizeCorrectnessArray(word: WordTranslation) {
        var correctnessArray = [];
        for (var i = 0; i < word.wordInSourceCountryLanguage.length; i++) {
            correctnessArray.push(LetterCorrectness[LetterCorrectness.NOT_TYPED]);
        }
        word.correctLettersForWord = correctnessArray;
    }

}