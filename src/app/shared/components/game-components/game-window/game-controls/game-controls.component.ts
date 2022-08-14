import { Component, Input, OnInit } from '@angular/core';
import { GameType } from 'src/app/shared/games/model/enum/GameType';
import { LanguagePack } from 'src/app/shared/games/typing-game/model/LanguagePack';
import { ModalService } from 'src/app/shared/service/modal-launcher.service';
import { SettingsManagerService } from 'src/app/shared/service/settings-manager.service';
import { GameSettings } from '../../../modal/learn-by-typing-settings-modal/GameSettings';

@Component({
  selector: 'app-game-controls',
  templateUrl: './game-controls.component.html',
  styleUrls: ['./game-controls.component.scss']
})
export class GameControlsComponent implements OnInit {

  @Input() gameSettings: GameSettings

  gameTypeSwitch: boolean = true;

  constructor(
    private settingsManager: SettingsManagerService,
    private modalService: ModalService
  ) { }

  ngOnInit(): void {
    this.settingsManager.settingsUpdatedEvent.subscribe(settings => {
      this.gameSettings = new GameSettings(
        settings.selectedLanguagePack,
        settings.packNumber, 
        settings.targetCountryCode,
        settings.gameType
      )
    })
  }

  launchSettingsModal() {
    var modalRef = this.modalService.launchGameSettingsModal(this.gameSettings);
    modalRef.content.packSelected.subscribe(number => {
      this.settingsManager.setPackNumber(number)
    });
  }

  switchGameType() {
    if (this.gameTypeSwitch) {
      this.settingsManager.setGameType(GameType.TYPING_GAME)
    } else {
      this.settingsManager.setGameType(GameType.MULTIPLE_CHOICE_GAME)
    }
  }

}
