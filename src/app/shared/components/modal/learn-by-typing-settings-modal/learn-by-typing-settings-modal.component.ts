import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { LanuagePack } from 'src/app/typing-game/model/LanguagePack';

@Component({
  selector: 'app-learn-by-typing-settings-modal',
  templateUrl: './learn-by-typing-settings-modal.component.html',
  styleUrls: ['./learn-by-typing-settings-modal.component.scss']
})
export class LearnByTypingSettingsModalComponent implements OnInit {

  languagePack: LanuagePack;

  constructor(private modalRef: BsModalRef) { }

  ngOnInit(): void {
  }

  closeModal(){
    this.modalRef.hide();
  }

}
