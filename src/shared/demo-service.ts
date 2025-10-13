import { inject, signal } from '@angular/core';
import { OtherService } from './other-service';

// providedIn: 'root' means you do NOT have to add a provider for this anywhere. But once you do, it will still create new instances.
//@Injectable({ providedIn: 'root' }) // makes this a singleton service.
export class DemoService {
  other = inject(OtherService);
  readonly created: string;
  private _hits = signal(0);

  constructor() {
    this.created = new Date().toISOString();
    console.log('Demo Service Created', this.created);
  }

  hits = this._hits.asReadonly();
  logHit() {
    this._hits.update((h) => h + 1);
  }
}
