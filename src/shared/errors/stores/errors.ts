import { computed } from '@angular/core';
import { signalStore, type, withComputed, withState } from '@ngrx/signals';
import { eventGroup, on, withReducer } from '@ngrx/signals/events';

export const applicationErrorEvents = eventGroup({
  source: 'Application Errors',
  events: {
    setError: type<{ error: string }>(),
    clearError: type<void>(),
  },
});
type AppErrorsState = {
  errorMessage: string | null;
};
export const AppErrorsStore = signalStore(
  withState<AppErrorsState>({
    errorMessage: null,
  }),
  withReducer(
    on(applicationErrorEvents.setError, ({ payload }) => ({
      errorMessage: payload.error,
    })),
    on(applicationErrorEvents.clearError, () => ({ errorMessage: null })),
  ),
  withComputed((state) => ({
    hasError: computed(() => state.errorMessage() !== null),
    errorMessage: computed(() => state.errorMessage()),
  })),
);
