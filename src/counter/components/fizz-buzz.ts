import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { CounterStore } from '../stores/counter';
import { assertNever } from '../../shared/utils/assert-never';

@Component({
  selector: 'app-counter-fizzbuzz',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    @if (message(); as message) {
      <div class="alert  alert-dash" [class]="message.style">
        {{ message.text }}
      </div>
    }
  `,

  styles: ``,
})
export class FizzBuzz {
  store = inject(CounterStore);

  message = computed(() => {
    const fb = this.store.fizzBuzz();
    switch (fb) {
      case 'Fizz':
        return {
          text: 'Fizz!',
          style: 'alert-info',
        };
      case 'Buzz':
        return {
          text: 'Buzz Achieved!',
          style: 'alert-warning',
        };
      case 'FizzBuzz':
        return {
          text: 'FIZZ BUZZING LIKE A BOSS!',
          style: 'alert-success',
        };
      case 'None':
        return null;
      case 'WINNER!':
        return {
          text: 'YOU FOUND THE SECRET CODE!',
          style: 'alert-success',
        };
      default:
        assertNever(fb);
    }
  });
}
