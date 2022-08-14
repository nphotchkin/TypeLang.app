import { Injectable } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { GameSettings } from '../components/modal/learn-by-typing-settings-modal/GameSettings';
import { LearnByTypingSettingsModalComponent } from '../components/modal/learn-by-typing-settings-modal/learn-by-typing-settings-modal.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(private modalService: BsModalService) {}

  /**
   * Launch a settings modal directly, use settings manager instead.
   * @see SettingsManagerService
   */
  public launchGameSettingsModal(gameSettings: GameSettings): BsModalRef {
    const modalData = {
      gameSettings: gameSettings
    };
    return this.modalService.show(LearnByTypingSettingsModalComponent, 
      {
        initialState : modalData,
        class: 'modal-black modal-lg'
      }
    );
  }

}
