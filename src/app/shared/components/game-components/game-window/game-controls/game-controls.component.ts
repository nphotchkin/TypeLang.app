import { Component, Input, OnInit } from '@angular/core';
import { GameType } from 'src/app/shared/games/model/enum/GameType';
import { LanguagePack } from 'src/app/shared/games/typing-game/model/LanguagePack';
import { SettingsManagerService } from 'src/app/shared/service/settings-manager.service';
import { GameSettings } from '../../../modal/learn-by-typing-settings-modal/GameSettings';

@Component({
  selector: 'app-game-controls',
  templateUrl: './game-controls.component.html',
  styleUrls: ['./game-controls.component.scss']
})
export class GameControlsComponent implements OnInit {

  @Input() gameSettings: GameSettings
  @Input() currentLanguagePack: LanguagePack

  gameTypeSwitch: boolean = true;

  constructor(
    private settingsManager: SettingsManagerService
  ) { }

  ngOnInit(): void {
  }

  launchSettingsModal() {
    this.settingsManager.launchGameSettings(this.currentLanguagePack);
  }

  switchGameType() {
    if (this.gameTypeSwitch) {
      this.settingsManager.setGameType(GameType.TYPING_GAME)
    } else {
      this.settingsManager.setGameType(GameType.MULTIPLE_CHOICE_GAME)
    }
  }

}
