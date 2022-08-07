import { Injectable } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { LearnByTypingSettingsModalComponent } from '../components/modal/learn-by-typing-settings-modal/learn-by-typing-settings-modal.component';
import { LanuagePack } from '../games/typing-game/model/LanguagePack';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(private modalService: BsModalService) {}

  /**
   * Launch a settings modal directly, use settings manager instead.
   * @see SettingsManagerService
   */
  public launchGameSettingsModal(languagePack: LanuagePack): BsModalRef {
    const modalData = {
      languagePack: languagePack
    };
    return this.modalService.show(LearnByTypingSettingsModalComponent, 
      {
        initialState : modalData,
        class: 'modal-black modal-lg'
      }
    );
  }

}
