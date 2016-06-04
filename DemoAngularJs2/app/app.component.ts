import { Component } from '@angular/core';
@Component({
    selector: 'my-app',
    template: `<h1>{{title}}</h1><h2>{{timeText}}
  <button (click)="start()">Start</button>
  <button (click)="stop()">Stop</button>
`
})
export class AppComponent {
    title = 'AngularJS 2 Demo';

    timerToken: number;
    timeText: string;

    start() {
        this.timerToken = setInterval(() => this.timeText = new Date().toUTCString(), 500);
    }

    stop() {
        clearTimeout(this.timerToken);
    }

    constructor() {
        this.start();
    }
}