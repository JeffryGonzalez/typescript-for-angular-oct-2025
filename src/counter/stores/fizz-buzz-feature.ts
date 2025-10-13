import {
  signalStoreFeature,
  type,
  withComputed,
  withState,
} from '@ngrx/signals';
import { fizzBuzzComputed } from '../utils/math';

export function withFizzBuzz() {
  return signalStoreFeature(
    {
      // this can be used on any store with a `current` state property
      state: type<{ current: number }>(),
    },
    withState({ current: 0 }),
    withComputed((store) => ({
      fizzBuzz: () => fizzBuzzComputed(store.current)(),
    })),
  );
}
