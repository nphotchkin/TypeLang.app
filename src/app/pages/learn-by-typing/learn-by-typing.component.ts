import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { LanguagePackService } from 'src/app/shared/service/language-pack.service';
import { ModalService } from 'src/app/shared/service/modal-launcher.service';
import { Timer } from 'src/app/typing-game/CountDownTimer';
import { LanuagePack } from 'src/app/typing-game/model/LanguagePack';
import { TypingGameStats } from 'src/app/typing-game/model/TypingGameStats';
import { TypingGame } from 'src/app/typing-game/TypingGame';

@Component({
  selector: 'app-learn-by-typing',
  templateUrl: './learn-by-typing.component.html',
  styleUrls: ['./learn-by-typing.component.scss']
})
export class LearnByTypingComponent implements OnInit {

  @ViewChild('typingbox') typingBox: ElementRef
  
  typingGame: TypingGame
  gameIsRunning: boolean = false
  isGameInitialized: boolean = false

  currentLanguagePack: LanuagePack;
  selectedPackName: string = 'top-200-words';
  selectedPackNumber: number = 1;
  currentGameComplete = false;

  statsFromPreviousGame: TypingGameStats

  audioPlayingForCurrentWord = false

  constructor(
    private languagePackService: LanguagePackService,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.initalize()
  }

  initalize() {
    this.languagePackService.getLanguagePack('top-200-words', 'es').then(pack => {
      this.currentLanguagePack = pack;
      this.languagePackService.getGameWordsGiven(pack, 1).then(wordsForGame=> {
        this.typingGame = new TypingGame(wordsForGame)

        this.typingGame.onComplete.subscribe(gameStats => {
          this.currentGameComplete = true
          this.statsFromPreviousGame = gameStats
        })
    
        this.isGameInitialized = true
      })
    })
  }

  onLetterTyped(event: any) {
    if(!this.gameIsRunning) this.newGame()

    if (!this.audioPlayingForCurrentWord) { // don't descriminate against `overtyping`
      var currentWordBeforeChecking = this.typingGame.currentWordTranslation
      var wordCorrect = this.typingGame.checkWord(event.target.value)
      if (wordCorrect) this.onCorrectWord(event, currentWordBeforeChecking.wordInEnglish)
    }
  }

  restart() {
    this.resetGame()
    setTimeout(()=>{ 
      this.typingBox.nativeElement.focus()
    },0);
  }

  launchSettingsModal() {
    var modalRef = this.modalService.launchLearnByTypingSettings(this.currentLanguagePack);

    modalRef.content.event.subscribe(settings => {
        this.isGameInitialized = false;
        this.languagePackService.getGameWordsGiven(this.currentLanguagePack, settings.packNumber).then(wordsForGame=> {
          this.selectedPackNumber = settings.packNumber
          this.typingGame = new TypingGame(wordsForGame)
          this.isGameInitialized = true

          this.typingGame.onComplete.subscribe(() => {
            this.currentGameComplete = true
          })
        })
    });
  }
 
  private resetGame() {
    this.gameIsRunning = false
    this.typingGame = new TypingGame(this.typingGame.wordsForExistingGame)
    this.currentGameComplete = false
    this.typingGame.onComplete.subscribe(() => {
      this.currentGameComplete = true
    })
  }

  private newGame() {
    this.gameIsRunning = true
    this.typingGame.startGame()
  }

  private onCorrectWord(event: any, currentWord: string) {
    event.target.style.color = "#90ee90"
    event.target.style.fontWeight = "bold"
    var audio = new Audio(`assets/typing-game/language-files/sound-clips/spanish/${currentWord}.mp3`)
    audio.play();
    this.audioPlayingForCurrentWord = true

    var that = this
    audio.onended = function() {
        event.target.value = ""
        event.target.style.color = "white"
        event.target.style.fontWeight = "normal"
        that.audioPlayingForCurrentWord = false 
    }
  }

}
