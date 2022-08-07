import { Component, EventEmitter, Input, OnDestroy, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Just, Maybe, Nothing } from 'purify-ts';
import { LanuagePack } from 'src/app/shared/games/typing-game/model/LanguagePack';
import { GameSettings } from './GameSettings';

@Component({
  selector: 'app-learn-by-typing-settings-modal',
  templateUrl: './learn-by-typing-settings-modal.component.html',
  styleUrls: ['./learn-by-typing-settings-modal.component.scss']
})
export class LearnByTypingSettingsModalComponent implements OnInit {

  languagePack: LanuagePack;

  selectedPack: any = "1";

  public event: EventEmitter<Maybe<GameSettings>> = new EventEmitter();

  constructor(private modalRef: BsModalRef) { }

  ngOnInit(): void {
  }

  save() {
    this.event.emit( 
      Just(
        new GameSettings(this.languagePack.languagePackName, parseInt(this.selectedPack), 'es')
      )
    );
    this.modalRef.hide();
  }

  closeModal(){
    this.event.emit( 
      Nothing
    );
    this.modalRef.hide();
  }

}
