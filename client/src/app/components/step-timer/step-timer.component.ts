import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-step-timer',
  templateUrl: './step-timer.component.html',
  styleUrls: ['./step-timer.component.scss'],
})
export class StepTimerComponent implements OnInit {
  constructor() {}
  @Input() stepTime: string;

  hours: number;
  minutes: number;
  seconds: number;

  clicked: boolean = false;
  isFinished: boolean = false;
  noTimer = false;

  interval: any;

  ngOnInit(): void {
    this.stepTime !== undefined && this.convertStepTime();
  }

  convertStepTime(): void {
    const times = this.stepTime.split(':');
    this.hours = isNaN(parseInt(times[0])) ? 0 : parseInt(times[0]);
    this.minutes = isNaN(parseInt(times[1])) ? 0 : parseInt(times[1]);
    this.seconds = 0;
    if (this.hours === 0 && this.minutes === 0 && this.seconds === 0)
      this.noTimer = true;
  }

  startTimer(): void {
    this.clicked = true;

    if (this.hours >= 1 && this.minutes === 0) {
      this.hours--;
      this.minutes = 60;
    }

    if (this.minutes >= 1) {
      this.minutes--;
      this.seconds = 59;
      this.interval = setInterval(() => {
        // if timer has reached zero, clear interval and exit function
        if (this.hours === 0 && this.minutes === 0 && this.seconds === 0) {
          clearInterval(this.interval);
          this.isFinished = true;
          return;
        }

        // 3 hours, zero minutes... 3h 00m 00s => 2h 59m 59s
        // 1 hour, zero min, zero sec... 1h 00m 00s => 0h 59m 60s  => 0h 59m 59s next interval
        if (this.seconds === 0 && this.minutes === 0 && this.hours >= 1) {
          this.hours--;
          this.minutes = 60;
        }

        // 1 hour, zero min, zero sec... 1h 00m 00s => 0h 59m 60s  => 0h 59m 59s next interval

        // if seconds === 0, e.g. 1m 00s => 0m 59s
        if (this.seconds === 0) {
          this.minutes--;
          this.seconds = 60;
        }

        this.seconds--;
      }, 1000);
    }
  }

  resetTimer(): void {
    this.convertStepTime();
    clearInterval(this.interval);
    this.clicked = false;
    this.isFinished = false;
  }

  addClass(): any {
    return {
      isFinished: this.isFinished,
      notFinished: !this.isFinished,
    };
  }
}
