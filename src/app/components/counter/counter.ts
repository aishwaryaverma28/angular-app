import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-counter',
  imports: [],
  templateUrl: './counter.html',
  styleUrl: './counter.scss',
})
export class Counter {
  counterValue = signal(0);
  increase(){
this.counterValue.update((val) => val+1);
  }

  decrease(){
this.counterValue.update((val) => val-1);
  }

  reset(){
this.counterValue.set(0);
  }
}
