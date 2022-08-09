import { Component, OnInit } from '@angular/core';
import { GameSettings } from 'src/app/shared/components/modal/learn-by-typing-settings-modal/GameSettings';
import { CurrentGameState } from 'src/app/shared/games/typing-game/model/CurrentGameSettings';
import { SettingsManagerService } from 'src/app/shared/service/settings-manager.service';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit {

  gameSettings: GameSettings
  currentGameState: CurrentGameState

  constructor(
    private settingsManagerService: SettingsManagerService
  ) { }

  ngOnInit(): void {
    this.gameSettings = this.settingsManagerService.defaultSettings()
    this.currentGameState = new CurrentGameState()
  }

}
