import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { LanuagePack } from 'src/app/typing-game/model/LanguagePack';
import { LearnByTypingSettings } from './LearnByTypingSettings';

@Component({
  selector: 'app-learn-by-typing-settings-modal',
  templateUrl: './learn-by-typing-settings-modal.component.html',
  styleUrls: ['./learn-by-typing-settings-modal.component.scss']
})
export class LearnByTypingSettingsModalComponent implements OnInit {

  languagePack: LanuagePack;

  selectedPack: any = "1";

  public event: EventEmitter<LearnByTypingSettings> = new EventEmitter();

  constructor(private modalRef: BsModalRef) { }

  ngOnInit(): void {
  }

  save() {
    this.event.emit( 
      new LearnByTypingSettings(this.languagePack.languagePackName, parseInt(this.selectedPack))
    );
    this.modalRef.hide();
  }

  closeModal(){
    this.modalRef.hide();
  }

}
