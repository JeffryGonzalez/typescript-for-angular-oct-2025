import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { SectionNav } from '../shared/components/section-nav';
import { SectionNavLink } from '../shared/components/types';
import { CustomerData } from './services/customer-data';

@Component({
  selector: 'app-customers',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SectionNav],
  providers: [CustomerData],
  template: `
    <app-section-nav sectionName="Customer Management" [links]="links()" />
  `,
  styles: ``,
})
export class Customers {
  links = signal<SectionNavLink[]>([
    {
      label: 'Customer List',
      link: 'list',
      requiresLogin: false,
    },
  ]);
}
