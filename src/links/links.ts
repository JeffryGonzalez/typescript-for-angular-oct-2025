import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { LinksStore } from './stores/links';
import { SectionNav } from '../shared/components/section-nav';
import { SectionNavLink } from '../shared/components/types';

@Component({
  selector: 'app-links',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [LinksStore],
  imports: [SectionNav],
  template: `
    @if (store.isLoaded()) {
      <app-section-nav sectionName="Useful Links" [links]="links()">
      </app-section-nav>
    } @else {
      <div class="alert alert-warning">Loading your Links</div>
    }
  `,
  styles: ``,
})
export class Links {
  store = inject(LinksStore);

  links = signal<SectionNavLink[]>([
    {
      label: 'List',
      link: 'list',
      requiresLogin: false,
    },
    {
      label: 'Preferences',
      link: 'prefs',
      requiresLogin: false,
    },
    {
      label: 'Add',
      link: 'add',
      requiresLogin: true,
    },
    {
      label: 'Demos',
      link: 'demo',
      requiresLogin: false,
    },
  ]);
}
