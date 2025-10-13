import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthStore } from '../auth/stores/auth';

export const isLoggedInGuard: CanActivateFn = () => {
  const store = inject(AuthStore);
  return store.isLoggedIn();
};
