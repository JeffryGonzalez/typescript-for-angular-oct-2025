import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Add } from './add';
import { List } from '../components/list';
@Component({
  selector: 'app-links-demo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [List, Add],
  template: `
    <div class="flex flex-row gap-4">
      <div>
        <app-links-list />
      </div>
      <div>
        <app-link-add />
      </div>
    </div>
  `,
  styles: ``,
})
export default class Demo {}
