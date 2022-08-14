import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SettingsManagerService } from '../../service/settings-manager.service';
import { GameSettings } from '../modal/learn-by-typing-settings-modal/GameSettings';

@Component({
  selector: 'app-language-pack-selector',
  templateUrl: './language-pack-selector.component.html',
  styleUrls: ['./language-pack-selector.component.scss']
})
export class LanguagePackSelectorComponent implements OnInit {

  @Input() gameSettings: GameSettings;
  @Output() packSelected: EventEmitter<any> = new EventEmitter();

  constructor(private settingsManager: SettingsManagerService) { }

  ngOnInit(): void {
  }

  onPackSelected(packNumber: number) {
    this.settingsManager.setPackNumber(packNumber);
    this.packSelected.emit()
  }

}
