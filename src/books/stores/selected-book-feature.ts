import {
  patchState,
  signalStoreFeature,
  withMethods,
  withState,
} from '@ngrx/signals';

type SelectedBookState = {
  selectedBookId: string | null;
};
export function withSelectedBook() {
  return signalStoreFeature(
    withState<SelectedBookState>({
      selectedBookId: null,
    }),
    withMethods((store) => ({
      selectBook: (id: string | null) =>
        patchState(store, { selectedBookId: id }),
    })),
  );
}
