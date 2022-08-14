import { EventEmitter, Injectable } from '@angular/core';
import { Maybe } from 'purify-ts';
import { GameSettings as GameSettings } from '../components/modal/learn-by-typing-settings-modal/GameSettings';
import { GameType } from '../games/model/enum/GameType';
import { LanguagePack } from '../games/typing-game/model/LanguagePack';
import { LanguagePackService } from './language-pack.service';
import { ModalService } from './modal-launcher.service';

@Injectable({
  providedIn: 'root'
})
export class SettingsManagerService {

  public settingsUpdatedEvent: EventEmitter<GameSettings> = new EventEmitter();
  private currentSettings: GameSettings = null;

  constructor(
    private languagePackService: LanguagePackService
  ) {
    this.defaultSettings()
  }

  setPackNumber(number: number) {
    this.currentSettings.packNumber = number
    this.settingsUpdatedEvent.emit(this.currentSettings);
  }

  setGameType(gameType: GameType) {
    console.log(this)
    this.currentSettings.gameType = gameType;
    this.settingsUpdatedEvent.emit(this.currentSettings);
  }

  async defaultSettings(): Promise<GameSettings> {
    var defaultLanguagePack = await this.languagePackService.getLanguagePack(
      'top-200-words', 
      'es'
    );
    this.currentSettings = new GameSettings(defaultLanguagePack, 1, 'es', GameType.TYPING_GAME);
    return this.currentSettings
  }

}
