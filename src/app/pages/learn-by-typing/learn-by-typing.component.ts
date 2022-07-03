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

  ngOnInit(): void {
  }

  onLetterTyped(event: any) {
    if(!this.gameIsRunning) this.newGame();

    var currentWord = this.typingGame.currentWord;
    var wordCorrect = this.typingGame.checkWord(event.target.value);
    if (wordCorrect) {
      var audio = new Audio(`assets/typing-game/language-files/sound-clips/spanish/${currentWord}.mp3`);
      audio.play();
      audio.onended = function() {
        if (wordCorrect) {
          event.target.value = "";
        }
      }
    }
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
    setTimeout(()=>{ // this will make the execution after the above boolean has changed
      this.typingBox.nativeElement.focus();
    },0);
  }
}
