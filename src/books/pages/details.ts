import {
  Component,
  ChangeDetectionStrategy,
  input,
  inject,
  effect,
} from '@angular/core';
import { BooksStore } from '../stores/books';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-book-details',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  template: `
    <div class="container mx-auto py-8 px-4">
      <a routerLink="/books/list" class="btn btn-sm btn-ghost mb-4">
        <span class="mr-2">←</span> Back to Books
      </a>

      @if (store.getSelectedBook(); as book) {
        <div class="card lg:card-side bg-base-100 shadow-xl">
          <figure
            class="lg:w-1/3 bg-base-200 flex items-center justify-center p-8"
          >
            <!-- Book icon placeholder -->
            <div class="text-8xl text-primary opacity-70">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
                />
              </svg>
            </div>
          </figure>
          <div class="card-body lg:w-2/3">
            <h1 class="card-title text-3xl">{{ book.title }}</h1>
            <div class="badge badge-accent">ID: {{ book.id }}</div>

            <div class="divider"></div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h2 class="text-xl font-semibold mb-2">Author</h2>
                <p class="text-lg">{{ book.author }}</p>
              </div>

              <div>
                <h2 class="text-xl font-semibold mb-2">Publication Year</h2>
                <p class="text-lg">{{ book.year }}</p>
              </div>

              <div>
                <h2 class="text-xl font-semibold mb-2">Pages</h2>
                <p class="text-lg">{{ book.pages }}</p>
                <div class="mt-2">
                  <div class="flex items-center">
                    <span class="text-xs mr-2">Length:</span>
                    <progress
                      class="progress progress-primary w-full"
                      value="{{ book.pages }}"
                      max="1000"
                    ></progress>
                  </div>
                  <p class="text-xs text-right mt-1">
                    {{ getPageDescription(book.pages) }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      } @else if (store.books.isLoading()) {
        <div class="flex justify-center items-center h-64">
          <span class="loading loading-spinner loading-lg"></span>
        </div>
      } @else {
        <div class="alert alert-error">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Book not found.</span>
        </div>
      }
    </div>
  `,
  styles: `
    :host {
      display: block;
    }
  `,
})
export class Details {
  id = input.required<string>();
  store = inject(BooksStore);

  constructor() {
    effect(() => {
      this.store.selectBook(this.id());
    });
  }

  getPageDescription(pages: number): string {
    if (pages < 100) {
      return 'Short read';
    } else if (pages < 300) {
      return 'Medium length';
    } else if (pages < 500) {
      return 'Long read';
    } else {
      return 'Epic length';
    }
  }
}
