import {
  Component,
  ChangeDetectionStrategy,
  inject,
  signal,
} from '@angular/core';

import { CustomerData } from '../services/customer-data';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-customers-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  template: `
    <p class="text-2xl font-bold pb-8">Customer List</p>

    <div>
      @for (customer of customers(); track customer.id) {
        <div
          class="card w-full bg-base-100 shadow-md mb-4 p-8 border-2 border-accent"
        >
          <div class="card-body">
            <h2 class="card-title">{{ customer.fullName }}</h2>
            <p>Customer ID: {{ customer.id }}</p>
          </div>
          <div class="card-actions">
            <a
              class="btn btn-primary"
              [routerLink]="['/customers', customer.id]"
            >
              View Details
            </a>
          </div>
        </div>
      }
    </div>
  `,
  styles: ``,
})
export class List {
  #service = inject(CustomerData);
  customers = signal<{ id: string; fullName: string }[]>([]);

  constructor() {
    this.load();
  }

  async load() {
    const customersList = await this.#service.list();
    this.customers.set(customersList());
  }
}
