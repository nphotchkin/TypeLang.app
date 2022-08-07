import { EventEmitter, Injectable } from '@angular/core';
import { Maybe } from 'purify-ts';
import { GameSettings as GameSettings } from '../components/modal/learn-by-typing-settings-modal/GameSettings';
import { LanuagePack } from '../games/typing-game/model/LanguagePack';
import { ModalService } from './modal-launcher.service';

@Injectable({
  providedIn: 'root'
})
export class SettingsManagerService {

  public settingsUpdatedEvent: EventEmitter<GameSettings> = new EventEmitter();

  constructor(private modalService: ModalService) {}

  launchGameSettings(languagePack: LanuagePack) {
    var modalRef = this.modalService.launchGameSettingsModal(languagePack);
    
    modalRef.content.event.subscribe(settings => {
      settings.ifJust(updatedSettings => {
        this.settingsUpdatedEvent.emit(updatedSettings);
      })
    });
  }

  defaultSettings(): GameSettings {
    return GameSettings.ofDefault()
  }


}
