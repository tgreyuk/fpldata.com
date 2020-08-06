import { Injectable } from '@angular/core';
import { Action, State, StateContext, createSelector } from '@ngxs/store';
import { tap } from 'rxjs/operators';

import { ApiService } from '../api/api.service';
import { GetEntryById, GetPlayers, GetScorecard } from './store.actions';
import { StoreModel } from './store.models';

@State<StoreModel>({
  name: 'store',
  defaults: {
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
      (state: StoreModel) => state.entries[id].picks
    );
  }

  static getScorecard(id: string) {
    return createSelector(
      [AppState],
      (state: StoreModel) => state.entries[id].scorecard
    );
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
          ...ctx.getState(),
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

    if (store.entries[id] && store.entries[id].picks) {
      return;
    }

    return this.dataService.getPicks(id).pipe(
      tap((result) => {
        ctx.patchState({
          ...ctx.getState(),
          entries: {
            [id]: { ...ctx.getState().entries[id], picks: result.picks },
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
          ...ctx.getState(),
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
}
