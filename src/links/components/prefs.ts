import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { LinksStore } from '../stores/links';

@Component({
  selector: 'app-links-prefs',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    <div class="join">
      <button
        (click)="store.changeSortOrder('NewestFirst')"
        [disabled]="store.sortingBy() === 'NewestFirst'"
        class="btn btn-ghost join-item"
      >
        Newest First
      </button>
      <button
        (click)="store.changeSortOrder('OldestFirst')"
        [disabled]="store.sortingBy() === 'OldestFirst'"
        class="btn btn-ghost join-item"
      >
        Oldest First
      </button>
    </div>
  `,
  styles: ``,
})
export class Prefs {
  store = inject(LinksStore);
}
