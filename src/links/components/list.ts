import { DatePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { LinksStore } from '../stores/links';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-links-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DatePipe, RouterLink],
  template: `
    <div
      class="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    >
      @for (link of sortedList(); track link.id) {
        <div
          class="card bg-base-100 shadow-sm h-full flex flex-col border-2 border-accent"
        >
          <div class="card-body flex-1 flex flex-col">
            <h2 class="card-title text-lg line-clamp-2">{{ link.title }}</h2>
            <p class="flex-1 text-sm opacity-70 line-clamp-3">
              {{ link.description }}
            </p>
            <div class="mt-auto space-y-2">
              <div class="text-xs opacity-60">
                <p class="truncate">{{ link.link }}</p>
                <p>Added on {{ link.added | date: 'medium' }}</p>
              </div>
              <div class="card-actions justify-end">
                <a
                  [routerLink]="['..', 'list', link.id]"
                  class="btn btn-primary btn-sm"
                  >Details</a
                >
                <a
                  [href]="link.link"
                  target="_blank"
                  class="btn btn-primary btn-sm"
                  >Visit</a
                >
              </div>
            </div>
          </div>
        </div>
      } @empty {
        <div class="col-span-full text-center py-8">
          <p class="text-lg opacity-70">There are no links! Bummer!</p>
        </div>
      }
    </div>
  `,
  styles: ``,
})
export class List {
  //   sortOptions = signal<SortingOptions>('OldestFirst');

  store = inject(LinksStore);

  sortedList = computed(() => {
    const links = this.store.entities() || [];
    const sortingBy = this.store.sortingBy();

    return [...links].sort((lhs, rhs) => {
      const aDate = new Date(lhs.added);
      const bDate = new Date(rhs.added);
      if (sortingBy === 'NewestFirst') {
        if (aDate < bDate) {
          return 1;
        }
        if (aDate > bDate) {
          return -1;
        }
        return 0;
      } else {
        if (aDate < bDate) {
          return -1;
        }
        if (aDate > bDate) {
          return 1;
        }
        return 0;
      }
    });
  });
}
