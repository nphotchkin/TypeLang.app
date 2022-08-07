
export class Timer {

    private totalTime: number = 0
    private intervalId: number = null
  
    start(): void {
      this.intervalId = window.setInterval(() => {
        this.totalTime = this.totalTime + 1
      }, 1000);
    }
  
    stop(): void {
      if (this.intervalId) {
        clearInterval(this.intervalId)
        this.intervalId = null
      }
    }
  
    reset(): void {
      this.stop()
      this.totalTime = 0
    }
  
    get totalTimeElapsedSeconds(): number {
      return this.totalTime
    }
    
}
  