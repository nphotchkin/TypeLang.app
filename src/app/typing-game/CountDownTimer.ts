
export class CountDownTimer {

    private countDownFromInSeconds = 60;
    private timeLeftInSeconds: number;
    private intervalId: number = null;
  
    start(countDownFromInSeconds: number): void {
      this.stop();
  
      this.countDownFromInSeconds = countDownFromInSeconds;
      this.timeLeftInSeconds = countDownFromInSeconds;
  
      this.intervalId = window.setInterval(() => {
        this.timeLeftInSeconds = this.timeLeftInSeconds - 1;
      }, 1000);
    }
  
    stop(): void {
      if (this.intervalId) {
        clearInterval(this.intervalId);
        this.intervalId = null;
      }
    }
  
    reset(): void {
      this.stop();
      this.timeLeftInSeconds = this.countDownFromInSeconds;
    }
  
    get timeLeft() {
      return this.timeLeftInSeconds;
    }
  
}
  