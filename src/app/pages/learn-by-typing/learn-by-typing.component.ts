import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CurrentGameState } from 'src/app/shared/games/typing-game/model/CurrentGameSettings';
import { TypingGameStats } from 'src/app/shared/games/typing-game/model/TypingGameStats';
import { TypingGame } from 'src/app/shared/games/typing-game/TypingGame';

import { LanguagePackService } from 'src/app/shared/service/language-pack.service';
import { ModalService } from 'src/app/shared/service/modal-launcher.service';

@Component({
  selector: 'app-learn-by-typing',
  templateUrl: './learn-by-typing.component.html',
  styleUrls: ['./learn-by-typing.component.scss']
})
export class LearnByTypingComponent implements OnInit {

  @ViewChild('typingbox') typingBox: ElementRef
  // countDownTimer: CountDownTimer = new CountDownTimer()
  typingGame: TypingGame
  currentGameSettings: CurrentGameState
  
  constructor(
    private languagePackService: LanguagePackService,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.currentGameSettings = new CurrentGameState()
    this.newGame()
  }

  onLetterTyped(event: any) {
    if(!this.currentGameSettings.gameIsRunning) this.newGame()
    var currentWordBeforeChecking = this.typingGame.currentWordTranslation
    var wordCorrect = this.typingGame.checkWord(event.target.value)
    if (wordCorrect) this.onCorrectWord(event, currentWordBeforeChecking.wordInEnglish)
  }

  newGame() {
    this.currentGameSettings.resetGame()
    this.languagePackService.getLanguagePack(this.currentGameSettings.selectedPackName, this.currentGameSettings.targetCountryCode).then(pack => {
      this.currentGameSettings.currentLanguagePack = pack;
      this.languagePackService.getGameWordsGiven(pack, this.currentGameSettings.selectedPackNumber).then(wordsForGame=> {
        this.typingGame = new TypingGame(wordsForGame)
        this.currentGameSettings.gameInitialized()

        this.typingGame.onComplete.subscribe((typingGameStats: TypingGameStats) => {
          this.currentGameSettings.onEndGameEvent(typingGameStats)
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
    var modalRef = this.modalService.launchLearnByTypingSettings(this.currentGameSettings.currentLanguagePack);

    modalRef.content.event.subscribe(settings => {
      this.currentGameSettings.selectedPackNumber = settings.packNumber
      this.currentGameSettings.selectedPackName = settings.languagePackName
      this.restart()
    });
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
