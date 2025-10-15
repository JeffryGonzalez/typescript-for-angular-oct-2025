import {
  Component,
  ChangeDetectionStrategy,
  input,
  inject,
  effect,
  signal,
} from '@angular/core';
import { CustomerData } from '../services/customer-data';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-customer-details',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  template: `
    <div class="container mx-auto p-6 max-w-4xl">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-base-content mb-2">
          Customer Details
        </h1>
        <div class="divider"></div>
      </div>

      @if (customer(); as customer) {
        <!-- Customer Card -->
        <div class="card bg-base-100 shadow-xl">
          <div class="card-body">
            <!-- Customer Info Header -->
            <div class="flex items-center gap-4 mb-6">
              <div class="avatar avatar-online avatar-placeholder">
                <div class="bg-neutral text-neutral-content w-16 rounded-full">
                  <span class="text-xl font-semibold">{{ initials() }}</span>
                </div>
              </div>
              <div>
                <h2 class="card-title text-2xl">{{ customer.fullName }}</h2>
                <p class="text-base-content/70">Customer Profile</p>
              </div>
            </div>

            <!-- Contact Information -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Email -->
              <div class="form-control">
                <div class="label">
                  <span class="label-text font-semibold">
                    <svg
                      class="w-4 h-4 inline mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"
                      ></path>
                      <path
                        d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"
                      ></path>
                    </svg>
                    Email Address
                  </span>
                </div>
                <div
                  class="input input-bordered flex items-center gap-2 bg-base-200"
                >
                  <span class="text-base-content">{{ customer.email }}</span>
                </div>
              </div>

              <!-- Phone -->
              <div class="form-control">
                <div class="label">
                  <span class="label-text font-semibold">
                    <svg
                      class="w-4 h-4 inline mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"
                      ></path>
                    </svg>
                    Phone Number
                  </span>
                </div>
                <div
                  class="input input-bordered flex items-center gap-2 bg-base-200"
                >
                  <span class="text-base-content">{{ customer.phone }}</span>
                </div>
              </div>
            </div>

            <!-- Actions -->
            <div class="card-actions justify-end mt-6">
              <a class="btn btn-primary" routerLink="/customers/list">
                <svg
                  class="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  ></path>
                </svg>
                Back To List
              </a>
            </div>
          </div>
        </div>
      } @else {
        <!-- Loading State -->
        <div class="flex flex-col items-center justify-center min-h-[400px]">
          <span class="loading loading-spinner loading-lg text-primary"></span>
          <p class="mt-4 text-lg text-base-content/70">
            Loading customer details...
          </p>
        </div>
      }
    </div>
  `,
  styles: ``,
})
export class Details {
  id = input.required<string>();
  #service = inject(CustomerData);
  customer = signal<{
    id: string;
    fullName: string;
    email: string;
    phone: string;
  } | null>(null);

  // signal to hold computed initials
  initials = signal<string>('');

  constructor() {
    effect(() => {
      const id = this.id();
      if (id) {
        this.getCustomer(id);
      } else {
        this.customer.set(null);
        this.initials.set('');
      }
    });
  }

  async getCustomer(id: string) {
    const customer = await this.#service.getCustomer(id);
    this.customer.set(customer);

    // compute initials from fullName: first and last name initials (fallback to first two chars)
    let initials = '';
    if (customer?.fullName) {
      const parts = customer.fullName.trim().split(/\s+/);
      if (parts.length === 1) {
        initials = (parts[0].slice(0, 2) || parts[0].slice(0, 1)).toUpperCase();
      } else {
        const first = parts[0][0] ?? '';
        const last = parts[parts.length - 1][0] ?? '';
        initials = (first + last).toUpperCase();
      }
    }
    this.initials.set(initials);
  }
}
