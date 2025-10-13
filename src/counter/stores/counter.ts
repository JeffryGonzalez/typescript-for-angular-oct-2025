import { computed } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withProps,
  withState,
} from '@ngrx/signals';

import {
  withStorageSync,
  withDevtools,
} from '@angular-architects/ngrx-toolkit';
import { withFizzBuzz } from './fizz-buzz-feature';

const CountByValues = [1, 3, 5] as const;
export type CountByValue = (typeof CountByValues)[number];

type CounterState = {
  by: CountByValue;
  current: number;
};

export const CounterStore = signalStore(
  withDevtools('counter'),
  withState<CounterState>({
    by: 1,
    current: 0,
  }),
  withFizzBuzz(),
  withProps(() => ({
    countByValues: CountByValues,
  })),
  withStorageSync('counter-new'),
  withMethods((state) => ({
    setBy: (by: CountByValue) => patchState(state, { by }),
    increment: () =>
      patchState(state, { current: state.current() + state.by() }),
    decrement: () =>
      patchState(state, { current: state.current() - state.by() }),
  })),
  withComputed((state) => ({
    decrementShouldBeDisabled: computed(() => state.current() - state.by() < 0),
  })),
);
