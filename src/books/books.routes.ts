import { Routes } from '@angular/router';
import { Books } from './books';
import { List } from './pages/list';
import { BooksStore } from './stores/books';
import { Prefs } from './pages/prefs';
import { Details } from './pages/details';
export const BOOKS_ROUTES: Routes = [
  {
    path: '',
    component: Books,
    providers: [BooksStore],
    children: [
      {
        path: 'list',
        component: List,
      },
      {
        path: 'prefs',
        component: Prefs,
      },
      {
        path: 'details/:id',
        component: Details,
      },
    ],
  },
];
