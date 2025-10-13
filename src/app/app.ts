import { Component, inject } from '@angular/core';
import { Navbar } from './components/navbar/navbar';
import { RouterOutlet } from '@angular/router';
import { DemoService } from '../shared/demo-service';
import { ErrorDisplay } from './components/error-display';

@Component({
  selector: 'app-root',
  template: `
    <app-error-display />
    <app-nav-bar />
    <main class="flex flex-col min-h-screen container mx-auto">
      <router-outlet />
    </main>
    <footer
      class="footer sm:footer-horizontal footer-center bg-base-300 text-base-content p-4 sticky bottom-0"
    >
      <p>Hit Count {{ service.hits() }}</p>
    </footer>
  `,
  styles: [],
  imports: [Navbar, RouterOutlet, ErrorDisplay],
})
export class App {
  service = inject(DemoService);
}
