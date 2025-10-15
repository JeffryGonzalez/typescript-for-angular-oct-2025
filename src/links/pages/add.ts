import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LinksStore } from '../stores/links';
import { ApiLinkCreateItem } from '../types';
import { JsonPipe } from '@angular/common';
import { createFormGroup, FormGroupType } from '../../shared/utils/forms';

type ApiLinkCreateItemFormThing = FormGroupType<ApiLinkCreateItem>;
@Component({
  selector: 'app-link-add',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, JsonPipe],
  template: `
    <div class="max-w-md mx-auto mt-8">
      <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
          <h2 class="card-title text-center mb-6">Add New Link</h2>

          <form [formGroup]="form" (ngSubmit)="addLink()" class="space-y-4">
            <!-- Title Field -->
            <div class="form-control w-full">
              <label class="label" for="title">
                <span class="label-text font-medium">Title</span>
                @if (form.get('title')?.invalid && form.get('title')?.touched) {
                  <span class="label-text-alt text-error">Required</span>
                }
              </label>
              <input
                id="title"
                type="text"
                name="title"
                formControlName="title"
                class="input input-bordered w-full"
                [class.input-error]="
                  form.get('title')?.invalid && form.get('title')?.touched
                "
                placeholder="Enter link title"
              />
              @if (form.get('title')?.invalid && form.get('title')?.touched) {
                <div class="label">
                  <span class="label-text-alt text-error">
                    @if (form.get('title')?.errors?.['required']) {
                      <span>Title is required</span>
                    }
                    @if (form.get('title')?.errors?.['maxlength']) {
                      <span>Title must be 100 characters or less</span>
                    }
                  </span>
                </div>
              }
            </div>

            <!-- Description Field -->
            <div class="form-control w-full">
              <label class="label" for="description">
                <span class="label-text font-medium">Description</span>
              </label>
              <textarea
                id="description"
                name="description"
                formControlName="description"
                class="textarea textarea-bordered w-full h-20"
                placeholder="Enter description (optional)"
              ></textarea>
            </div>

            <!-- Link Field -->
            <div class="form-control w-full">
              <label class="label" for="link">
                <span class="label-text font-medium">URL</span>
                @if (form.get('link')?.invalid && form.get('link')?.touched) {
                  <span class="label-text-alt text-error">Required</span>
                }
              </label>
              <input
                id="link"
                type="url"
                name="link"
                formControlName="link"
                class="input input-bordered w-full"
                [class.input-error]="
                  form.get('link')?.invalid && form.get('link')?.touched
                "
                placeholder="https://example.com"
              />
              @if (form.get('link')?.invalid && form.get('link')?.touched) {
                <div class="label">
                  <span class="label-text-alt text-error">
                    @if (form.get('link')?.errors?.['required']) {
                      <span>URL is required</span>
                    }
                    @if (form.get('link')?.errors?.['url']) {
                      <span>Please enter a valid URL</span>
                    }
                  </span>
                </div>
              }
            </div>

            <!-- Submit Button -->
            <div class="form-control mt-6">
              <button
                type="submit"
                class="btn btn-primary w-full"
                [class.loading]="isSubmitting"
              >
                @if (!isSubmitting) {
                  <span>Add Link</span>
                } @else {
                  <span>Adding...</span>
                }
              </button>
            </div>
          </form>
        </div>
      </div>
      <pre>{{ form.value | json }}</pre>
    </div>
  `,
  styles: ``,
})
export class Add {
  isSubmitting = false;

  defaults: ApiLinkCreateItem = {
    title: '',
    link: 'https://',
    description: 'Description Goes Here',
  };
  form = createFormGroup(this.defaults);

  constructor() {
    this.form.controls.title.addValidators(Validators.required); // etc. etc
  }

  store = inject(LinksStore);

  addLink() {
    if (this.form.valid) {
      this.isSubmitting = true;

      // Mark all fields as touched to show validation errors
      this.form.markAllAsTouched();

      try {
        const linkToAdd = this.form.value as ApiLinkCreateItem;
        this.store.addLink(linkToAdd);
        this.form.reset();

        // Reset touched state after successful submission
        this.form.markAsUntouched();
      } finally {
        this.isSubmitting = false;
      }
    } else {
      // Mark all fields as touched to show validation errors
      this.form.markAllAsTouched();
    }
  }
}
