import { authHandler } from './auth-handler';
import { Books_Handlers } from './books-handler';
import { articlesHandlers } from './links-handler';

export const handlers = [
  ...articlesHandlers,
  ...authHandler,
  ...Books_Handlers,
];
