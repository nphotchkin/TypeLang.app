import { Component, Input, OnInit } from '@angular/core';
import { GameSettings } from 'src/app/shared/components/modal/learn-by-typing-settings-modal/GameSettings';
import { QuestionAndAnswers } from 'src/app/shared/games/multiple-choice-game/model/QuestionAndAnswer';
import { MultipleChoiceGame } from 'src/app/shared/games/multiple-choice-game/MultipleChoiceGame';
import { LanuagePack } from 'src/app/shared/games/typing-game/model/LanguagePack';
import { WordTranslation } from 'src/app/shared/games/typing-game/model/WordTranslation';
import { LanguagePackService } from 'src/app/shared/service/language-pack.service';
import { SettingsManagerService } from 'src/app/shared/service/settings-manager.service';

@Component({
  selector: 'app-multiple-choice-game',
  templateUrl: './multiple-choice-game.component.html',
  styleUrls: ['./multiple-choice-game.component.scss']
})
export class MultipleChoiceGameComponent implements OnInit {

  currentLanguagePack: LanuagePack;
  multipleChoiceGame: MultipleChoiceGame;
  gameSettings: GameSettings

  questionAndAnswer: QuestionAndAnswers;
  endOfGame: boolean = false
  gameInitalized = false

  constructor(
    private languagePackService: LanguagePackService,
    private settingsManager: SettingsManagerService
  ) { }

  ngOnInit(): void {
    this.initSettings()
    this.newGame()
  }

  newGame() {
    this.languagePackService.getLanguagePack(this.gameSettings.languagePackName, this.gameSettings.targetCountryCode).then(pack => {
      this.currentLanguagePack = pack;
      this.languagePackService.getGameWordsGiven(pack, this.gameSettings.packNumber).then(wordsForGame=> {
        this.multipleChoiceGame = new MultipleChoiceGame(wordsForGame);
        this.questionAndAnswer = this.multipleChoiceGame.getCurrentQuestionAndAnswer();
        this.gameInitalized = true
        this.multipleChoiceGame.onComplete.subscribe(() => {
          this.endOfGame = true
        })
      })
    })
  }

  checkAnswer(input: WordTranslation, event: any) {
    this.multipleChoiceGame.checkAnswer(input).ifJust(newQuestionAndAnswer => {
      this.questionAndAnswer = newQuestionAndAnswer
      this.onCorrectWord(event, input.wordInEnglish)
    })
  }

  restart() {
    this.newGame()
    this.endOfGame = false
  }

  launchSettingsModal() {
    this.settingsManager.launchGameSettings(this.currentLanguagePack)
  }

  private initSettings() {
    this.gameSettings = this.settingsManager.defaultSettings();
    this.settingsManager.settingsUpdatedEvent.subscribe(settings => {
      this.gameSettings = settings
      this.restart()
    })
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