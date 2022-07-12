import { Injectable } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { LanuagePack } from 'src/app/typing-game/model/LanguagePack';
import { LearnByTypingSettingsModalComponent } from '../components/modal/learn-by-typing-settings-modal/learn-by-typing-settings-modal.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(private modalService: BsModalService) {}

  launchLearnByTypingSettings(languagePack: LanuagePack): BsModalRef {
    const modalData = {
      languagePack: languagePack
    };
    return this.modalService.show(LearnByTypingSettingsModalComponent, 
      {
        initialState : modalData
      }
    );
  }

}
