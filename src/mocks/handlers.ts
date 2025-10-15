import { authHandler } from './auth-handler';
import { Books_Handlers } from './books-handler';
import { customersHandler } from './customers-handler';
import { articlesHandlers } from './links-handler';

export const handlers = [
  ...articlesHandlers,
  ...authHandler,
  ...Books_Handlers,
  ...customersHandler,
];
