import { signalStoreFeature, withState } from '@ngrx/signals';
import { SortingOptions } from '../types';

export function withLinkSorting() {
  return signalStoreFeature(
    withState({
      sortingBy: 'NewestFirst' as SortingOptions,
    }),
  );
}
