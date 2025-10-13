import {
  Component,
  ChangeDetectionStrategy,
  input,
  computed,
} from '@angular/core';
import { BookApiItem } from '../types';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-books-stats',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="stats shadow w-full py-1">
      <div class="stat py-2">
        <div class="stat-title text-sm">Total Books</div>
        <div class="stat-value text-2xl">{{ totalBooks() }}</div>
      </div>

      <div class="stat py-2">
        <div class="stat-title text-sm">Earliest Book</div>
        <div class="stat-value text-2xl">{{ earliestBook() }}</div>
        <div class="stat-desc text-xs">Publication Year</div>
      </div>

      <div class="stat py-2">
        <div class="stat-title text-sm">Latest Book</div>
        <div class="stat-value text-2xl">{{ latestBook() }}</div>
        <div class="stat-desc text-xs">Publication Year</div>
      </div>

      <div class="stat py-2">
        <div class="stat-title text-sm">Average Pages</div>
        <div class="stat-value text-2xl">{{ averagePages() }}</div>
        <div class="stat-desc text-xs">Pages per Book</div>
      </div>
    </div>
  `,
  styles: `
    .stats {
      margin: 0.5rem 0;
    }
  `,
})
export class Stats {
  books = input.required<BookApiItem[]>();

  totalBooks = computed(() => this.books().length);
  earliestBook = computed(() => {
    const years = this.books().map((b) => b.year);
    return Math.min(...years);
  });
  latestBook = computed(() => {
    const years = this.books().map((b) => b.year);
    return Math.max(...years);
  });
  averagePages = computed(() => {
    if (this.books().length === 0) {
      return 0;
    }
    const totalPages = this.books().reduce((sum, book) => sum + book.pages, 0);
    return Math.round(totalPages / this.books().length);
  });
}
