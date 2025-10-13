import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-counter',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, RouterOutlet],
  providers: [],
  template: `
    <div class="flex flex-row gap-4">
      <a routerLink="ui" class="link">UI</a>
      <a routerLink="prefs" class="link">Prefs</a>
    </div>
    <div>
      <router-outlet />
    </div>
  `,
  styles: ``,
})
export class Counter {}
