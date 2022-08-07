import { Component, Input, OnInit } from '@angular/core';
import { MultipleChoiceGame } from 'src/app/shared/games/multiple-choice-game/MultipleChoiceGame';
import { CurrentGameWords } from 'src/app/shared/games/typing-game/model/CurrentGameWords';
import { LanguagePackService } from 'src/app/shared/service/language-pack.service';
import { SettingsManagerService } from 'src/app/shared/service/settings-manager.service';

@Component({
  selector: 'app-multiple-choice-game',
  templateUrl: './multiple-choice-game.component.html',
  styleUrls: ['./multiple-choice-game.component.scss']
})
export class MultipleChoiceGameComponent implements OnInit {

  multipleChoiceGame: MultipleChoiceGame;

  constructor(
    private languagePackService: LanguagePackService,
    private settingsManager: SettingsManagerService
  ) { }

  ngOnInit(): void {
    this.multipleChoiceGame = new MultipleChoiceGame(null);

    this.settingsManager.settingsUpdatedEvent.subscribe(settings => {
      
      this.restart()
    })

    // this.languagePackService.getLanguagePack(this.currentGameState.selectedPackName, this.currentGameState.targetCountryCode).then(pack => {
      
    //   this.languagePackService.getGameWordsGiven(pack, this.currentGameState.selectedPackNumber).then(wordsForGame=> {

    //   });

    // });

  }

  restart() {
   // do something
  }




}