import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { LearnByTypingSettings } from 'src/app/shared/components/modal/learn-by-typing-settings-modal/LearnByTypingSettings';
import { LanguagePackService } from 'src/app/shared/service/language-pack.service';
import { ModalService } from 'src/app/shared/service/modal-launcher.service';
import { LanguagePackResolver } from 'src/app/shared/util/TranslationFileResolver';
import { CountDownTimer } from 'src/app/typing-game/CountDownTimer';
import { CurrentGameWords, LetterCorrectness, WordTranslation } from 'src/app/typing-game/model/CurrentGameWords';
import { LanuagePack } from 'src/app/typing-game/model/LanguagePack';
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

  currentLanguagePack: LanuagePack;

  selectedPackName: string = 'top-100-words';
  selectedPackNumber: number = 1;
  
  constructor(
    private languagePackService: LanguagePackService,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.initalize()
  }

  initalize() {
    this.languagePackService.getLanguagePack('top-100-words', 'es').then(pack => {
      this.currentLanguagePack = pack;
      this.languagePackService.getGameWordsGiven(pack, 1).then(wordsForGame=> {
        this.typingGame = new TypingGame(wordsForGame)
        this.isGameInitialized = true
      })
    })
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

  launchSettingsModal() {
    var modalRef = this.modalService.launchLearnByTypingSettings(this.currentLanguagePack);

    modalRef.content.event.subscribe(settings => {
        this.isGameInitialized = false;
        this.languagePackService.getGameWordsGiven(this.currentLanguagePack, settings.packNumber).then(wordsForGame=> {
          this.selectedPackNumber = settings.packNumber;
          this.typingGame = new TypingGame(wordsForGame)
          this.isGameInitialized = true
        })
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
