import { computed } from '@angular/core';
import { signalStoreFeature, withComputed, withState } from '@ngrx/signals';

export type RequestStatus =
  | 'idle'
  | 'pending'
  | 'fulfilled'
  | 'loading'
  | 'refreshing'
  | { error: string };
export type RequestStatusState = { requestStatus: RequestStatus };

export function withRequestStatus() {
  return signalStoreFeature(
    withState<RequestStatusState>({ requestStatus: 'idle' }),
    withComputed(({ requestStatus }) => ({
      isLoaded: computed(() => requestStatus() !== 'loading'), // todo handle error here
      isPending: computed(() => requestStatus() === 'pending'),
      isFulfilled: computed(() => requestStatus() === 'fulfilled'),
      isRefreshing: computed(() => requestStatus() === 'refreshing'),
      error: computed(() => {
        const status = requestStatus();
        return typeof status === 'object' ? status.error : null;
      }),
    })),
  );
}

export function setPending(): RequestStatusState {
  return { requestStatus: 'pending' };
}

export function setFulfilled(): RequestStatusState {
  return { requestStatus: 'fulfilled' };
}

export function setError(error: string): RequestStatusState {
  return { requestStatus: { error } };
}

export function setRefreshing(): RequestStatusState {
  return { requestStatus: 'refreshing' };
}

export function setLoading(): RequestStatusState {
  return { requestStatus: 'loading' };
}
