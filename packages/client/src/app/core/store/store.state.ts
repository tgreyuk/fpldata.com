import { Injectable } from '@angular/core';
import { Action, State, StateContext, createSelector } from '@ngxs/store';
import { tap } from 'rxjs/operators';

import { ApiService } from '../api/api.service';
import {
  GetEntryById,
  GetPlayers,
  GetRouteId,
  GetScorecard,
} from './store.actions';
import { StoreModel } from './store.models';

@State<StoreModel>({
  name: 'store',
  defaults: {
    routeId: null,
    entries: {},
  },
})
@Injectable()
export class AppState {
  constructor(private dataService: ApiService) {}

  static getEntryById(id: string) {
    return createSelector(
      [AppState],
      (state: StoreModel) => state.entries[id].summary
    );
  }

  static getPlayers(id: string) {
    return createSelector(
      [AppState],
      (state: StoreModel) => state.entries[id].players
    );
  }

  static getScorecard(id: string) {
    return createSelector(
      [AppState],
      (state: StoreModel) => state.entries[id].scorecard
    );
  }

  static getRouteId() {
    return createSelector([AppState], (state: StoreModel) => state.routeId);
  }

  @Action(GetEntryById)
  getEntryById(ctx: StateContext<StoreModel>, action: GetEntryById) {
    const store = ctx.getState();
    const id = action.id;

    if (store.entries[id] && store.entries[id].summary) {
      return;
    }

    return this.dataService.getEntry(id).pipe(
      tap((result) => {
        ctx.patchState({
          entries: {
            [id]: { ...ctx.getState().entries[id], summary: result.summary },
          },
        });
      })
    );
  }
  @Action(GetPlayers)
  getPlayers(ctx: StateContext<StoreModel>, action: GetPlayers) {
    const store = ctx.getState();
    const id = action.id;

    if (store.entries[id] && store.entries[id].players) {
      return;
    }

    return this.dataService.getPlayers(id).pipe(
      tap((result) => {
        ctx.patchState({
          entries: {
            [id]: { ...ctx.getState().entries[id], players: result.players },
          },
        });
      })
    );
  }

  @Action(GetScorecard)
  getScoreCard(ctx: StateContext<StoreModel>, action: GetScorecard) {
    const store = ctx.getState();
    const id = action.id;

    if (store.entries[id] && store.entries[id].scorecard) {
      return;
    }

    return this.dataService.getScorecard(id).pipe(
      tap((result) => {
        ctx.patchState({
          entries: {
            [id]: {
              ...ctx.getState().entries[id],
              scorecard: result.scorecard,
            },
          },
        });
      })
    );
  }

  @Action(GetRouteId)
  getRouteId(ctx: StateContext<StoreModel>, action: GetRouteId) {
    ctx.patchState({ routeId: action.id });
  }
}
