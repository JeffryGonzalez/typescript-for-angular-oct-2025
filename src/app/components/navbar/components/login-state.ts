import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { injectDispatch } from '@ngrx/signals/events';
import { authEvents } from '../../../../shared/auth/auth-events';
import { AuthStore } from '../../../../shared/auth/stores/auth';

@Component({
  selector: 'app-login-status',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    @if (store.isLoggedIn()) {
      <button (click)="events.logoutRequested()" class="btn btn-primary">
        Logout {{ store.userName() }}
      </button>
    } @else {
      <button (click)="events.loginRequested()" class="btn btn-primary">
        Login
      </button>
    }
  `,
  styles: ``,
})
export class LoginState {
  store = inject(AuthStore);

  events = injectDispatch(authEvents);
}
