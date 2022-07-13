import { Component, Input, OnInit } from '@angular/core';
import { CurrentGameWords } from 'src/app/typing-game/model/CurrentGameWords';

@Component({
  selector: 'app-multiple-choice-game',
  templateUrl: './multiple-choice-game.component.html',
  styleUrls: ['./multiple-choice-game.component.scss']
})
export class MultipleChoiceGameComponent implements OnInit {

  @Input() gameWords: CurrentGameWords;

  constructor() { }

  ngOnInit(): void {
  }

  // Given 3 random words from pack and the correct one

}
