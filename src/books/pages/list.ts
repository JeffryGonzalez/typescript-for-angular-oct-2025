import { TitleCasePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { Stats } from '../components/stats';
import { BooksStore } from '../stores/books';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-books-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Stats, TitleCasePipe, RouterLink],
  template: `
    <h2 class="text-2xl font-bold mb-4">
      Books List
      <span class="text-sm font-light ml-2">
        Page {{ currentPage() }} of {{ totalPages() }} Sorted by
        {{ store.sortBy() | titlecase }}
        {{ store.ascending() ? 'Ascending' : 'Descending' }}
      </span>
    </h2>
    <app-books-stats [books]="store.books.value() || []"></app-books-stats>

    <!-- Books grid with pagination -->
    <div
      class="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    >
      @for (book of sortedBooks(); track book.id) {
        <div
          class="card bg-base-100 shadow-sm h-full flex flex-col border-2 border-accent"
        >
          <div class="card-body flex-1 flex flex-col">
            <h2 class="card-title text-lg line-clamp-2">
              <a
                [routerLink]="['..', 'details', book.id]"
                class="flex flex-row link"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                >
                  <!-- Icon from MingCute Icon by MingCute Design - https://github.com/Richard9394/MingCute/blob/main/LICENSE -->
                  <g fill="none">
                    <path
                      d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"
                    />
                    <path
                      fill="currentColor"
                      d="M15.889 9.525a1.5 1.5 0 0 1 2.007-.103l.114.103l2.122 2.121a6 6 0 0 1-8.303 8.661l-.183-.175l-2.121-2.122a1.5 1.5 0 0 1 2.007-2.224l.114.103l2.122 2.121a3 3 0 0 0 4.377-4.098l-.135-.144l-2.121-2.122a1.5 1.5 0 0 1 0-2.121m-7.071-.707a1.5 1.5 0 0 1 2.007-.103l.114.103l4.243 4.243a1.5 1.5 0 0 1-2.008 2.224l-.114-.103l-4.242-4.243a1.5 1.5 0 0 1 0-2.121m-4.95-4.95a6 6 0 0 1 8.302-.175l.184.175l2.12 2.122a1.5 1.5 0 0 1-2.007 2.224l-.114-.103l-2.12-2.121a3 3 0 0 0-4.378 4.098l.135.144l2.12 2.122a1.5 1.5 0 0 1-2.007 2.224l-.113-.103l-2.122-2.121a6 6 0 0 1 0-8.486"
                    />
                  </g></svg
                >{{ book.title }}
              </a>
            </h2>
            <p class="flex-1 text-sm opacity-70 line-clamp-3">
              {{ book.author }}
            </p>
            <div class="mt-auto space-y-2">
              <div class="text-xs opacity-60">
                <p class="truncate">Released in {{ book.year }}</p>
                <p>Number of Pages {{ book.pages }}</p>
              </div>
            </div>
          </div>
        </div>
      }

      @if (paginatedBooks().length === 0) {
        <div class="col-span-full text-center py-8">
          @if (this.store.books.isLoading()) {
            <span class="loading loading-spinner loading-lg"></span>
            <p class="mt-2">Loading books...</p>
          } @else {
            <p>No books found.</p>
          }
        </div>
      }
    </div>

    <!-- Pagination controls -->
    @if (totalPages() > 1) {
      <div class="flex justify-center my-8">
        <div class="join">
          <!-- Previous button -->
          <button
            class="join-item btn"
            [disabled]="currentPage() === 1"
            (click)="goToPreviousPage()"
          >
            «
          </button>

          <!-- Page numbers -->
          @for (page of pageNumbers(); track page) {
            @if (page === -1) {
              <button class="join-item btn btn-disabled">...</button>
            } @else {
              <button
                class="join-item btn"
                [class.btn-active]="page === currentPage()"
                (click)="goToPage(page)"
              >
                {{ page }}
              </button>
            }
          }

          <!-- Next button -->
          <button
            class="join-item btn"
            [disabled]="currentPage() === totalPages()"
            (click)="goToNextPage()"
          >
            »
          </button>
        </div>
      </div>
    }
  `,
  styles: ``,
})
export class List {
  store = inject(BooksStore);
  // Pagination
  currentPage = signal(1);
  pageSize = signal(8);

  sortedBooks = computed(() => {
    const books = this.paginatedBooks() || [];
    const sortBy = this.store.sortBy();
    const ascending = this.store.ascending();
    return books.toSorted((a, b) => {
      if (a[sortBy] < b[sortBy]) {
        return ascending ? -1 : 1;
      }
      if (a[sortBy] > b[sortBy]) {
        return ascending ? 1 : -1;
      }
      return 0;
    });
  });

  // Calculate paginated books
  paginatedBooks = computed(() => {
    const books = this.store.books.value() || [];
    const startIndex = (this.currentPage() - 1) * this.pageSize();
    return books.slice(startIndex, startIndex + this.pageSize());
  });

  // Total pages
  totalPages = computed(() => {
    const books = this.store.books.value() || [];
    return Math.ceil(books.length / this.pageSize());
  });

  // Page navigation methods
  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage.set(page);
    }
  }

  goToPreviousPage(): void {
    if (this.currentPage() > 1) {
      this.currentPage.update((page) => page - 1);
    }
  }

  goToNextPage(): void {
    if (this.currentPage() < this.totalPages()) {
      this.currentPage.update((page) => page + 1);
    }
  }

  // Get page numbers to display (current, prev, next, first, last)
  pageNumbers = computed(() => {
    const total = this.totalPages();
    const current = this.currentPage();

    if (total <= 7) {
      // If 7 or fewer pages, show all
      return Array.from({ length: total }, (_, i) => i + 1);
    }

    // Always include first, last, current page, and pages around current
    const pages = [1];

    if (current > 3) {
      pages.push(-1); // -1 indicates ellipsis
    }

    // Pages around current
    const start = Math.max(2, current - 1);
    const end = Math.min(total - 1, current + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (current < total - 2) {
      pages.push(-1); // -1 indicates ellipsis
    }

    if (total > 1) {
      pages.push(total);
    }

    return pages;
  });
}
