import { Component, Input, OnInit } from '@angular/core';
import { LanuagePack } from '../../games/typing-game/model/LanguagePack';
import { SettingsManagerService } from '../../service/settings-manager.service';
import { GameSettings } from '../modal/learn-by-typing-settings-modal/GameSettings';

@Component({
  selector: 'app-game-controls',
  templateUrl: './game-controls.component.html',
  styleUrls: ['./game-controls.component.scss']
})
export class GameControlsComponent implements OnInit {

  @Input() gameSettings: GameSettings
  @Input() currentLanguagePack: LanuagePack

  constructor(
    private settingsManager: SettingsManagerService
  ) { }

  ngOnInit(): void {
  }

  launchSettingsModal() {
    this.settingsManager.launchGameSettings(this.currentLanguagePack);
  }

}
