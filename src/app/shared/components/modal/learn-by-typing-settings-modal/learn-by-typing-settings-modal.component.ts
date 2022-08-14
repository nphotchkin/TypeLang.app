import { Component, EventEmitter, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { GameSettings } from './GameSettings';

@Component({
  selector: 'app-learn-by-typing-settings-modal',
  templateUrl: './learn-by-typing-settings-modal.component.html',
  styleUrls: ['./learn-by-typing-settings-modal.component.scss']
})
export class LearnByTypingSettingsModalComponent implements OnInit {

  gameSettings: GameSettings
  selectedPack: any = "1";

  public packSelected: EventEmitter<number> = new EventEmitter();

  constructor(
    private modalRef: BsModalRef
  ) { }

  ngOnInit(): void {
  }

  save() {
    this.packSelected.emit(Number(this.selectedPack))
    this.modalRef.hide();
  }

  closeModal(){
    this.modalRef.hide();
  }

}
