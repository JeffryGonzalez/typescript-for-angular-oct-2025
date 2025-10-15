import { Routes } from '@angular/router';
import { Customers } from './customers';
import { List } from './pages/list';
import { Details } from './pages/details';
export const CUSTOMERS_LINKS: Routes = [
  {
    path: '',
    component: Customers,
    children: [
      {
        path: 'list',
        component: List,
      },
      {
        path: ':id',
        component: Details,
      },
    ],
  },
];
