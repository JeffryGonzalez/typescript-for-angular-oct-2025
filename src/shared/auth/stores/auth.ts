import { signalStore, withComputed } from '@ngrx/signals';
import { withAuthEffects } from './auth-effect-feature';
import { withAuthReducers } from './auth-reducer-feature';
import { computed } from '@angular/core';
import { withDevtools } from '@angular-architects/ngrx-toolkit';

export const AuthStore = signalStore(
  withAuthEffects(),
  withAuthReducers(),
  withDevtools('auth'),
  withComputed((store) => ({
    isLoggedIn: computed(() => store.user() !== null),
    userName: computed(() => store.user()?.id),
  })),
);
