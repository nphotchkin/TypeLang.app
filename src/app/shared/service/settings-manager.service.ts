import { EventEmitter, Injectable } from '@angular/core';
import { Maybe } from 'purify-ts';
import { GameSettings as GameSettings } from '../components/modal/learn-by-typing-settings-modal/GameSettings';
import { GameType } from '../games/model/enum/GameType';
import { LanguagePack } from '../games/typing-game/model/LanguagePack';
import { ModalService } from './modal-launcher.service';

@Injectable({
  providedIn: 'root'
})
export class SettingsManagerService {

  public settingsUpdatedEvent: EventEmitter<GameSettings> = new EventEmitter();
  private currentSettings: GameSettings = this.defaultSettings();

  constructor(private modalService: ModalService) {}

  launchGameSettings(languagePack: LanguagePack) {
    var modalRef = this.modalService.launchGameSettingsModal(languagePack);
    
    modalRef.content.event.subscribe(settings => {
      settings.ifJust(updatedSettings => {
        this.currentSettings = updatedSettings
        this.settingsUpdatedEvent.emit(updatedSettings);
      })
    });
  }

  setGameType(gameType: GameType) {
    this.currentSettings.gameType = gameType;
    console.log("EMIT")
    console.log(this.currentSettings)
    this.settingsUpdatedEvent.emit(this.currentSettings);
  }

  defaultSettings(): GameSettings {
    return GameSettings.ofDefault()
  }


}
