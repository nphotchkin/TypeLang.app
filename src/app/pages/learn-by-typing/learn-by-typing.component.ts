import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CountDownTimer } from 'src/app/typing-game/CountDownTimer';
import { TypingGame } from 'src/app/typing-game/TypingGame';

@Component({
  selector: 'app-learn-by-typing',
  templateUrl: './learn-by-typing.component.html',
  styleUrls: ['./learn-by-typing.component.scss']
})
export class LearnByTypingComponent implements OnInit {

  @ViewChild('typingbox') typingBox: ElementRef;
  countDownTimer: CountDownTimer = new CountDownTimer();
  typingGame: TypingGame = new TypingGame();
  gameIsRunning: boolean = false;

  ngOnInit(): void {}

  onLetterTyped(event: any) {
    if(!this.gameIsRunning) this.newGame();
    var currentWordBeforeChecking = this.typingGame.currentWordTranslation;
    var wordCorrect = this.typingGame.checkWord(event.target.value);
    if (wordCorrect) this.onCorrectWord(event, currentWordBeforeChecking.wordInEnglish);
  }

  resetGame() {
    this.gameIsRunning = false;
    this.countDownTimer.reset();
    this.typingGame = new TypingGame();
  }

  newGame() {
    this.gameIsRunning = true;
    this.countDownTimer.start(60)
  }

  restart() {
    this.resetGame();
    setTimeout(()=>{ 
      this.typingBox.nativeElement.focus();
    },0);
  }

  private onCorrectWord(event: any, currentWord: string) {
    var audio = new Audio(`assets/typing-game/language-files/sound-clips/spanish/${currentWord}.mp3`);
    audio.play();
    audio.onended = function() {
        event.target.value = "";      
    }
  }

}
