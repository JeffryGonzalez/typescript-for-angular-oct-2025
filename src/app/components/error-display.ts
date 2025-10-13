import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import {
  AppErrorsStore,
  applicationErrorEvents,
} from '../../shared/errors/stores/errors';
import { injectDispatch } from '@ngrx/signals/events';

@Component({
  selector: 'app-error-display',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    @if (store.hasError()) {
      <div class="toast toast-top toast-start">
        <div class="alert alert-error">
          <div class="pl-2">
            <button
              (click)="events.clearError()"
              class="btn btn-xs btn-circle btn-warning"
            >
              X
            </button>
          </div>
          <span>{{ store.errorMessage() }}</span>
        </div>
      </div>
    }
  `,
  styles: ``,
})
export class ErrorDisplay {
  store = inject(AppErrorsStore);
  events = injectDispatch(applicationErrorEvents);
}
