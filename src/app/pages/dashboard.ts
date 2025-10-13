import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-dashboard-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    <div class="prose">
      <h2>TypeScript for Angular Developers</h2>
      <p>
        The <em>starter</em> for this class is from the Applied Angular Course
        taught next week.
      </p>
      <h2>Resources</h2>
      <ul>
        <li>
          <a href="https://typescript.hypertheory.com" target="_blank"
            >Course Materials</a
          >
        </li>
        <li>
          <a
            href="https://www.totaltypescript.com/books/total-typescript-essentials"
            target="_blank"
            >Total TypeScript: Matt Pocock</a
          >
        </li>
        <li>
          <a href="https://typescriptlang.org" target="_blank"
            >TypeScript Language</a
          >
        </li>
        <li>
          <a href="https://angular.io" target="_blank">Angular Framework</a>
        </li>
      </ul>
    </div>
  `,
  styles: ``,
})
export class Dashboard {}
