// create a "reducer" feature for the store.
// reducers maintain some "state" based on the events that have happened.

import { signalStoreFeature, withState } from '@ngrx/signals';
import { on, withReducer } from '@ngrx/signals/events';
import { authEffectEvents } from '../auth-events';

type AuthState = {
  user: {
    id: string;
  } | null;
};

export function withAuthReducers() {
  return signalStoreFeature(
    withState<AuthState>({
      user: null,
    }),
    withReducer(
      on(authEffectEvents.loginSucceeded, ({ payload }) => ({
        user: { id: payload.userid },
      })),
      on(authEffectEvents.logoutSucceeded, () => ({ user: null })),
    ),
  );
}
