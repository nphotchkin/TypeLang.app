import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GameSettings } from 'src/app/shared/components/modal/learn-by-typing-settings-modal/GameSettings';
import { CurrentGameState } from 'src/app/shared/games/typing-game/model/CurrentGameSettings';
import { TypingGameStats } from 'src/app/shared/games/typing-game/model/TypingGameStats';
import { TypingGame } from 'src/app/shared/games/typing-game/TypingGame';

import { LanguagePackService } from 'src/app/shared/service/language-pack.service';
import { SettingsManagerService } from 'src/app/shared/service/settings-manager.service';

@Component({
  selector: 'app-learn-by-typing',
  templateUrl: './learn-by-typing.component.html',
  styleUrls: ['./learn-by-typing.component.scss']
})
export class LearnByTypingComponent implements OnInit {

  @ViewChild('typingbox') typingBox: ElementRef
  // countDownTimer: CountDownTimer = new CountDownTimer()
  typingGame: TypingGame
  currentGameState: CurrentGameState
  gameSettings: GameSettings
  
  switchSize: number = 2000

  constructor(
    private languagePackService: LanguagePackService,
    private settingsManager: SettingsManagerService
  ) {}

  ngOnInit(): void {
    this.currentGameState = new CurrentGameState()
    
    this.gameSettings = this.settingsManager.defaultSettings();
    this.settingsManager.settingsUpdatedEvent.subscribe(settings => {
      this.gameSettings = settings
      this.restart()
    })

    this.newGame()
  }

  onLetterTyped(event: any) {
    if(!this.currentGameState.gameIsRunning) this.newGame()
    var currentWordBeforeChecking = this.typingGame.currentWordTranslation
    var wordCorrect = this.typingGame.checkWord(event.target.value)
    if (wordCorrect) this.onCorrectWord(event, currentWordBeforeChecking.wordInEnglish)
  }

  newGame() {
    this.currentGameState.resetGame()
    this.languagePackService.getLanguagePack(this.gameSettings.languagePackName, this.gameSettings.targetCountryCode).then(pack => {
      this.currentGameState.currentLanguagePack = pack;
      this.languagePackService.getGameWordsGiven(pack, this.gameSettings.packNumber).then(wordsForGame=> {
        this.typingGame = new TypingGame(wordsForGame)
        this.currentGameState.gameInitialized()

        this.typingGame.onComplete.subscribe((typingGameStats: TypingGameStats) => {
          this.currentGameState.onEndGameEvent(typingGameStats)
        })
      })
    })

  }

  restart() {
    setTimeout(()=>{ 
      this.typingBox.nativeElement.focus()
    },0);
    this.newGame()
  }

  launchSettingsModal() {
    this.settingsManager.launchGameSettings(this.currentGameState.currentLanguagePack);
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
