import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { computed, inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import {
  patchState,
  signalStore,
  watchState,
  withComputed,
  withHooks,
  withMethods,
} from '@ngrx/signals';
import { addEntity, setEntities, withEntities } from '@ngrx/signals/entities';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { exhaustMap, pipe, switchMap } from 'rxjs';
import {
  setFulfilled,
  setLoading,
  withRequestStatus,
} from '../../shared/request-status-feature';
import { LinksApi } from '../services/links-api';
import { ApiLinkCreateItem, ApiLinkItem, SortingOptions } from '../types';
import { withLinkSorting } from './link-sorting-feature';
import { injectDispatch } from '@ngrx/signals/events';
import { applicationErrorEvents } from '../../shared/errors/stores/errors';

export const LinksStore = signalStore(
  withRequestStatus(),
  withDevtools('links-store'),
  withEntities<ApiLinkItem>(),
  withLinkSorting(),
  withComputed((store) => {
    return {
      getNumberOfLinks: computed(() => store.entities().length),
    };
  }),
  withMethods((state) => {
    const api = inject(LinksApi);
    const errorEvents = injectDispatch(applicationErrorEvents);
    return {
      addLink: rxMethod<ApiLinkCreateItem>(
        pipe(
          switchMap((link) =>
            api.addLink(link).pipe(
              tapResponse({
                next: (link) => patchState(state, addEntity(link)),
                error: () => console.error('Cannot add the link'),
              }),
            ),
          ),
        ),
      ),
      _load: rxMethod<void>(
        pipe(
          exhaustMap(() =>
            api.getLinks().pipe(
              tapResponse({
                next: (r) => patchState(state, setEntities(r), setFulfilled()),
                error: () =>
                  errorEvents.setError({
                    error: 'Could Not Load Your Links. Sorry.',
                  }),
              }),
            ),
          ),
        ),
      ),
      changeSortOrder: (sortingBy: SortingOptions) =>
        patchState(state, { sortingBy }),
    };
  }),
  withHooks({
    onInit(store) {
      patchState(store, setLoading());
      store._load();
      // setInterval(() => {
      //   patchState(store, setRefreshing());
      //   store._load();
      // }, 5000); // polling
      const savedSortOption = localStorage.getItem('sort-order');
      if (savedSortOption !== null) {
        store.changeSortOrder(savedSortOption as SortingOptions);
      }
      watchState(store, ({ sortingBy }) => {
        localStorage.setItem('sort-order', sortingBy);
      });
    },
  }),
);
