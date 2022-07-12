import { Injectable } from '@angular/core';
import { CurrentGameWords, LetterCorrectness, WordTranslation } from 'src/app/typing-game/model/CurrentGameWords';
import { LanuagePack } from 'src/app/typing-game/model/LanguagePack';
import { LanguagePackResolver } from '../util/TranslationFileResolver';

@Injectable({
  providedIn: 'root'
})
export class LanguagePackService {

  constructor() { }

  public listLanguagePackNames(): string[] {
    return ['top-200-words'];
  }

  // TODO: should be an ISO2 country code that is an ENUM for safety (LOWERCASE IT)
  public getLanguagePack(languagePackName: string, targetCountryIso2Code: string): Promise<LanuagePack>  {
    return new Promise(function(resolve, reject){
      try {  
        LanguagePackResolver.resolve(languagePackName, targetCountryIso2Code).then(languagePack => {
          resolve(languagePack)
        })
      } catch (error) {
        console.error(`Unable to locate language pack for languagePackName: ${languagePackName}, ${targetCountryIso2Code}, reason: ${error}`)
        reject(error)
      }
    })
  }

  public getGameWordsGiven(languagePack: LanuagePack, packNumber: number): Promise<CurrentGameWords> {
    return new Promise(function(resolve, reject){
      try{
        var wordTranslationsForFirstPack = languagePack.packs[0].wordTranslations
        
        // Typescript is broken :) you cant init variables via a private method through a constructor!
        wordTranslationsForFirstPack.forEach(wordTranslation=> {

            // Initalize the correctness array for the current word translateion
            var correctnessArray = [];
            for (var i = 0; i < wordTranslation.wordInSourceCountryLanguage.length; i++) {
                correctnessArray.push(LetterCorrectness[LetterCorrectness.NOT_TYPED]);
            }
            wordTranslation.correctLettersForWord = correctnessArray
        })
        
        var wordsForSelectedPackInLangagePack = new CurrentGameWords(
            languagePack.sourceCountryCode,
            languagePack.targetCountryCode,
            languagePack.languagePackName,
            wordTranslationsForFirstPack
        )

        resolve(wordsForSelectedPackInLangagePack)
      } catch (error) {
        console.error(`Unable to init gamewords from pack given languagePack: ${languagePack}, packNumber: ${packNumber}`)
        reject(error)
      }
    })
  }

}