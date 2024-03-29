import { Component, OnInit } from '@angular/core';

// import { GameType } from 'src/app/shared/components/game/GameType';
import { GameSettings } from 'src/app/shared/components/modal/learn-by-typing-settings-modal/GameSettings';
import { SettingsManagerService } from 'src/app/shared/service/settings-manager.service';

@Component({
  selector: 'app-game-window',
  templateUrl: './game-window.component.html',
  styleUrls: ['./game-window.component.scss']
})
export class GameWindowComponent implements OnInit {

  initalized: boolean = false
  gameSettings: GameSettings 

  constructor(
    private settingsManager: SettingsManagerService
  ) { }

  ngOnInit(): void {
    this.settingsManager.defaultSettings().then(settings => {
      this.gameSettings = settings
      this.initalized = true
    })  
    this.listenForSettingChanges()
  }

  listenForSettingChanges() {
    this.settingsManager.settingsUpdatedEvent.subscribe(settings => {
      this.gameSettings = new GameSettings(
        settings.selectedLanguagePack,
        settings.packNumber, 
        settings.targetCountryCode,
        settings.gameType
      )
    })
  }

}
