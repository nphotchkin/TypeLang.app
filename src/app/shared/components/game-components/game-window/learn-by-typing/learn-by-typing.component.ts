import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { GameSettings } from 'src/app/shared/components/modal/learn-by-typing-settings-modal/GameSettings';
import { CurrentGameState } from 'src/app/shared/games/typing-game/model/CurrentGameSettings';
import { LanguagePack } from 'src/app/shared/games/typing-game/model/LanguagePack';
import { TypingGameStats } from 'src/app/shared/games/typing-game/model/TypingGameStats';
import { TypingGame } from 'src/app/shared/games/typing-game/TypingGame';

import { LanguagePackService } from 'src/app/shared/service/language-pack.service';
import { SettingsManagerService } from 'src/app/shared/service/settings-manager.service';

@Component({
  selector: 'app-learn-by-typing',
  templateUrl: './learn-by-typing.component.html',
  styleUrls: ['./learn-by-typing.component.scss']
})
export class LearnByTypingComponent implements OnInit, OnChanges {

  @Input() gameSettings: GameSettings

  @ViewChild('typingbox') typingBox: ElementRef
  // countDownTimer: CountDownTimer = new CountDownTimer()
  typingGame: TypingGame
  currentGameState: CurrentGameState

  constructor(
    private languagePackService: LanguagePackService,
  ) {}

  ngOnInit(): void {
    this.newGame()
  }

  ngOnChanges(changes: SimpleChanges) {
    this.restart()
  }

  onLetterTyped(event: any) {
    if(!this.currentGameState.gameIsRunning) this.newGame()
    var currentWordBeforeChecking = this.typingGame.currentWordTranslation
    var wordCorrect = this.typingGame.checkWord(event.target.value)
    if (wordCorrect) this.onCorrectWord(event, currentWordBeforeChecking.wordInEnglish)
  }

  newGame() {
    this.currentGameState = new CurrentGameState(this.gameSettings.selectedLanguagePack)
    this.languagePackService.getGameWordsGiven(this.gameSettings.selectedLanguagePack, this.gameSettings.packNumber).then(wordsForGame=> {
      this.currentGameState.resetGame()
      this.typingGame = new TypingGame(wordsForGame)
      this.currentGameState.gameInitialized()

      this.typingGame.onComplete.subscribe((typingGameStats: TypingGameStats) => {
        this.currentGameState.onEndGameEvent(typingGameStats)
      })
    })
  }

  restart() {
    console.log("RESTARTING GAME WITH PACK NUMBER" + this.gameSettings.packNumber)
    setTimeout(()=>{ 
      this.typingBox.nativeElement.focus()
    },0);
    this.newGame()
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
