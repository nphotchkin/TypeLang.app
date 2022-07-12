import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { LanguagePackResolver } from 'src/app/shared/util/TranslationFileResolver';
import { CountDownTimer } from 'src/app/typing-game/CountDownTimer';
import { CurrentGameWords, LetterCorrectness, WordTranslation } from 'src/app/typing-game/model/CurrentGameWords';
import { TypingGame } from 'src/app/typing-game/TypingGame';

@Component({
  selector: 'app-learn-by-typing',
  templateUrl: './learn-by-typing.component.html',
  styleUrls: ['./learn-by-typing.component.scss']
})
export class LearnByTypingComponent implements OnInit {

  @ViewChild('typingbox') typingBox: ElementRef
  countDownTimer: CountDownTimer = new CountDownTimer()
  typingGame: TypingGame
  gameIsRunning: boolean = false
  isGameInitialized: boolean = false

  ngOnInit(): void {
    this.initalize()
  }

  initalize() {
    LanguagePackResolver.resolve('top-200-words', 'es').then(gameWords => {
        var wordTranslationsForFirstPack = gameWords.packs[0].wordTranslations
        
        // Typescript is broken :) you cant init variables via a private method through a constructor!
        wordTranslationsForFirstPack.forEach(wordTranslation=> {
          this.initalizeCorrectnessArray(wordTranslation)
        })
        
        var wordsForSelectedPackInLangagePack = new CurrentGameWords(
            "gb",
            "es",
            "top-200-words",
            wordTranslationsForFirstPack
        )
      
        this.typingGame = new TypingGame(wordsForSelectedPackInLangagePack)
        this.isGameInitialized = true
    })
  }

  private initalizeCorrectnessArray(word: WordTranslation) {
    var correctnessArray = [];
    for (var i = 0; i < word.wordInSourceCountryLanguage.length; i++) {
        correctnessArray.push(LetterCorrectness[LetterCorrectness.NOT_TYPED]);
    }
    word.correctLettersForWord = correctnessArray
  }

  onLetterTyped(event: any) {
    if(!this.gameIsRunning) this.newGame()
    var currentWordBeforeChecking = this.typingGame.currentWordTranslation
    var wordCorrect = this.typingGame.checkWord(event.target.value)
    if (wordCorrect) this.onCorrectWord(event, currentWordBeforeChecking.wordInEnglish)
  }

  resetGame() {
    this.gameIsRunning = false
    this.countDownTimer.reset()
    this.typingGame = new TypingGame(this.typingGame.wordsForExistingGame)
  }

  newGame() {
    this.gameIsRunning = true
    this.countDownTimer.start(60)
  }

  restart() {
    this.resetGame()
    setTimeout(()=>{ 
      this.typingBox.nativeElement.focus()
    },0);
  }

  private onCorrectWord(event: any, currentWord: string) {
    event.target.style.color = "#90ee90"
    event.target.style.fontWeight = "bold"
    var audio = new Audio(`assets/typing-game/language-files/sound-clips/spanish/${currentWord}.mp3`)
    audio.play();
    audio.onended = function() {
        event.target.value = ""
        event.target.style.color = "white"
        event.target.style.fontWeight = "normal"
    }
  }

}
