import { EventEmitter, Injectable } from '@angular/core';
import { Maybe } from 'purify-ts';
import { LearnByTypingSettings } from '../components/modal/learn-by-typing-settings-modal/LearnByTypingSettings';
import { LanuagePack } from '../games/typing-game/model/LanguagePack';
import { ModalService } from './modal-launcher.service';

@Injectable({
  providedIn: 'root'
})
export class SettingsManagerService {

  public settingsUpdatedEvent: EventEmitter<LearnByTypingSettings> = new EventEmitter();

  constructor(private modalService: ModalService) {}

  launchGameSettings(languagePack: LanuagePack) {
    var modalRef = this.modalService.launchGameSettingsModal(languagePack);
    
    modalRef.content.event.subscribe(settings => {
      settings.ifJust(updatedSettings => {
        this.settingsUpdatedEvent.emit(updatedSettings);
      })
    });
  }


}
