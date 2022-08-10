import { Component, OnInit } from '@angular/core';

// import { GameType } from 'src/app/shared/components/game/GameType';
import { GameSettings } from 'src/app/shared/components/modal/learn-by-typing-settings-modal/GameSettings';
import { CurrentGameState } from 'src/app/shared/games/typing-game/model/CurrentGameSettings';
import { LanguagePack } from 'src/app/shared/games/typing-game/model/LanguagePack';
import { LanguagePackService } from 'src/app/shared/service/language-pack.service';
import { SettingsManagerService } from 'src/app/shared/service/settings-manager.service';

@Component({
  selector: 'app-game-window',
  templateUrl: './game-window.component.html',
  styleUrls: ['./game-window.component.scss']
})
export class GameWindowComponent implements OnInit {

  initalized: boolean = false
  gameSettings: GameSettings = this.settingsManager.defaultSettings()
  languagePack: LanguagePack 

  constructor(
    private settingsManager: SettingsManagerService, 
    private languagePackService: LanguagePackService
  ) { }

  ngOnInit(): void {
    this.getDefaultLanguagePack()
    this.listenForSettingChanges()
  }

  listenForSettingChanges() {
    this.settingsManager.settingsUpdatedEvent.subscribe(settings => {
      console.log("UPDATED SETTINGS")
      console.log(this.gameSettings)
      this.gameSettings = settings
    })
  }
  
  getDefaultLanguagePack() {
    this.languagePackService.getLanguagePack(
        this.gameSettings.languagePackName, 
        this.gameSettings.targetCountryCode
    ).then(pack => {
      this.languagePack = pack
      this.initalized = true
    });
  }
  
}
