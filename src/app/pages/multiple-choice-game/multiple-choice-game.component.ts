import { Component, Input, OnInit } from '@angular/core';
import { CurrentGameWords } from 'src/app/shared/games/typing-game/model/CurrentGameWords';
import { WordTranslation } from 'src/app/shared/games/typing-game/model/WordTranslation';



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




  /*
   */
  


  // Given 3 random words from pack and the correct one

}


export class MultipleChoiceGame {

  words: WordTranslation[];

}


export class MultipleChoiceItem {

  correctAnswer: string;
  answerOptions: string[];

}