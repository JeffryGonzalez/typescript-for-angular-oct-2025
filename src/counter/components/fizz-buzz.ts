import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CounterStore } from '../stores/counter';

@Component({
  selector: 'app-counter-fizzbuzz',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    @switch (store.fizzBuzz()) {
      @case ('FizzBuzz') {
        <div class="alert alert-success alert-dash">FizzBuzz</div>
      }
      @case ('Fizz') {
        <div class="alert alert-info alert-dash">Fizz!</div>
      }
      @case ('Buzz') {
        <div class="alert alert-warning alert-dash">Buzz!</div>
      }
    }
  `,
  styles: ``,
})
export class FizzBuzz {
  store = inject(CounterStore);
}
