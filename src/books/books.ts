import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { SectionNav } from '../shared/components/section-nav';
import { SectionNavLink } from '../shared/components/types';

@Component({
  selector: 'app-books',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SectionNav],
  template: ` <app-section-nav sectionName="Books" [links]="links()" /> `,
  styles: ``,
})
export class Books {
  links = signal<SectionNavLink[]>([
    {
      label: 'List Of Books',
      link: 'list',
      requiresLogin: false,
    },
    {
      label: 'Preferences',
      link: 'prefs',
      requiresLogin: false,
    },
  ]);
}
