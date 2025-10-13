import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { SectionNavLink } from './types';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthStore } from '../auth/stores/auth';
import { injectDispatch } from '@ngrx/signals/events';
import { authEvents } from '../auth/auth-events';

@Component({
  selector: 'app-section-nav',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  template: `
    <div class="navbar bg-base shadow-sm my-8">
      @if (sectionName()) {
        <a routerLink="." class="btn btn-ghost text-xl">{{ sectionName() }}</a>
      }
      <ul class="menu menu-horizontal px-4">
        @for (link of links(); track link.link) {
          <li>
            @if (link.requiresLogin && authStore.isLoggedIn()) {
              <a [routerLinkActive]="['underline']" [routerLink]="link.link">{{
                link.label
              }}</a>
            } @else {
              @if (link.requiresLogin) {
                <div class="tooltip tooltip-bottom" data-tip="Login required">
                  <button (click)="aEvents.loginRequested()" class="opacity-50">
                    {{ link.label }}
                  </button>
                </div>
              } @else {
                <a
                  [routerLinkActive]="['underline']"
                  [routerLink]="link.link"
                  >{{ link.label }}</a
                >
              }
            }
          </li>
        }
      </ul>
    </div>
    <ng-content></ng-content>
    <router-outlet />
  `,
  styles: ``,
})
export class SectionNav {
  sectionName = input<string | undefined>(undefined);
  links = input.required<SectionNavLink[]>();
  authStore = inject(AuthStore);
  aEvents = injectDispatch(authEvents);
}
