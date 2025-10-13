import { Component, ChangeDetectionStrategy, input } from '@angular/core';

@Component({
  selector: 'app-link-details',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    <div class="p-4">
      <h1 class="text-2xl font-bold">Link Details</h1>
      <p class="mt-2">
        Here you can view the details of the selected link. {{ id() }}
      </p>
    </div>
  `,
  styles: ``,
})
export class Details {
  id = input.required<string>();
}
