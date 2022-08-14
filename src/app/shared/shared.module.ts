import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './components/navigation/navigation.component';
import { FooterComponent } from './components/footer/footer.component';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { JwBootstrapSwitchNg2Module } from 'jw-bootstrap-switch-ng2';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { AlertModule } from 'ngx-bootstrap/alert';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { ModalModule } from 'ngx-bootstrap/modal';
import { SwiperModule } from "swiper/angular";
import SwiperCore, { Navigation } from 'swiper';

import { LearnByTypingSettingsModalComponent } from './components/modal/learn-by-typing-settings-modal/learn-by-typing-settings-modal.component';
import { GameControlsComponent } from './components/game-components/game-window/game-controls/game-controls.component';
import { GameWindowComponent } from './components/game-components/game-window/game-window.component';
import { MultipleChoiceGameComponent } from './components/game-components/game-window/multiple-choice-game/multiple-choice-game.component';
import { LearnByTypingComponent } from './components/game-components/game-window/learn-by-typing/learn-by-typing.component';
import { LanguagePackSelectorComponent } from './components/language-pack-selector/language-pack-selector.component';

// install Swiper modules
SwiperCore.use([Navigation]);

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    RouterModule,
    BsDropdownModule.forRoot(),
    ProgressbarModule.forRoot(),
    TooltipModule.forRoot(),
    PopoverModule.forRoot(),
    CollapseModule.forRoot(),
    JwBootstrapSwitchNg2Module,
    TabsModule.forRoot(),
    PaginationModule.forRoot(),
    AlertModule.forRoot(),
    BsDatepickerModule.forRoot(),
    CarouselModule.forRoot(),
    ModalModule.forRoot(),
    SwiperModule,
  ],
  declarations: [
    NavigationComponent,
    FooterComponent,
    LearnByTypingSettingsModalComponent,
    GameControlsComponent,
    GameWindowComponent, 
    MultipleChoiceGameComponent,
    LearnByTypingComponent,
    LanguagePackSelectorComponent
  ],
  exports: [
    NavigationComponent,
    FooterComponent,
    GameControlsComponent,
    GameWindowComponent,
    LanguagePackSelectorComponent
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class SharedModule { }
