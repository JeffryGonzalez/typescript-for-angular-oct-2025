import { inject } from '@angular/core';
import { signalStoreFeature } from '@ngrx/signals';
import { Events, injectDispatch, withEffects } from '@ngrx/signals/events';

import { AuthApi } from '../services/auth-api';
import { map, switchMap, tap } from 'rxjs';
import { mapResponse } from '@ngrx/operators';
import { authEffectEvents, authEvents } from '../auth-events';
import { applicationErrorEvents } from '../../errors/stores/errors';
import { Router } from '@angular/router';

export function withAuthEffects() {
  return signalStoreFeature(
    withEffects(
      (
        _,
        events = inject(Events),
        api = inject(AuthApi),
        errorEvents = injectDispatch(applicationErrorEvents),
        router = inject(Router),
      ) => ({
        handleLogin$: events.on(authEvents.loginRequested).pipe(
          switchMap(() =>
            api.getUser().pipe(
              mapResponse({
                next(value) {
                  return authEffectEvents.loginSucceeded({
                    userid: value!.userId,
                  });
                },
                error() {
                  return authEffectEvents.loginFailed({
                    errorMessage: 'Login Failed',
                  });
                },
              }),
            ),
          ),
        ),
        handleLogout$: events.on(authEvents.logoutRequested).pipe(
          tap(() => router.navigateByUrl('/')),
          map(() => authEffectEvents.logoutSucceeded()),
        ),

        handleLoginFailed$: events.on(authEffectEvents.loginFailed).pipe(
          map(() =>
            errorEvents.setError({
              error: `Could Not Log You In`,
            }),
          ),
        ),
      }),
    ),
  );
}
