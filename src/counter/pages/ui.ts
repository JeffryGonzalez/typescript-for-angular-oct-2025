import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { FizzBuzz } from '../components/fizz-buzz';
import { CounterStore } from '../stores/counter';

@Component({
  selector: 'app-counter-ui',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FizzBuzz],
  template: ` <div>
    <button
      [disabled]="store.decrementShouldBeDisabled()"
      (click)="store.decrement()"
      class="btn btn-primary"
    >
      -
    </button>
    <span>{{ store.current() }}</span>
    <button (click)="store.increment()" class="btn btn-primary">+</button>
    <div>
      <app-counter-fizzbuzz />
    </div>
  </div>`,
  styles: ``,
})
export class Ui {
  store = inject(CounterStore);
}
