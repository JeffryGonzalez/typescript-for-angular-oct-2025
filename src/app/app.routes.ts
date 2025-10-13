import { Routes } from '@angular/router';
import { Dashboard } from './pages/dashboard';
import { Support } from './pages/support';

export const routes: Routes = [
  {
    path: 'dashboard',
    component: Dashboard,
  },
  {
    path: 'support',
    component: Support,
  },

  {
    path: 'links',
    loadChildren: () =>
      import('../links/link.routes').then((l) => l.LINKS_ROUTES),
  },
  {
    path: 'counter',
    loadChildren: () =>
      import('../counter/counter.routes').then((l) => l.COUNTER_ROUTES),
  },

  {
    path: 'books',
    loadChildren: () =>
      import('../books/books.routes').then((b) => b.BOOKS_ROUTES),
  },
  {
    path: '**',
    redirectTo: 'dashboard',
  },
];
