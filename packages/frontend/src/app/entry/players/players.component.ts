import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import orderBy from 'lodash/orderBy';
import { Subject } from 'rxjs';
import { mergeMap, switchMap, take } from 'rxjs/operators';
import { GetPlayers } from 'src/app/core/store/store.actions';
import { AppState } from 'src/app/core/store/store.state';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.scss'],
})
export class PlayersComponent implements OnInit {
  destroy$ = new Subject<void>();
  entry: any;
  players: any;
  sortedPlayers: any;
  sortOrder: 'desc' | 'asc';
  constructor(private store: Store) {}

  ngOnInit() {
    this.store
      .select(AppState.getRouteId())
      .pipe(
        take(1),
        switchMap((id) =>
          this.store.dispatch(new GetPlayers(id)).pipe(
            take(1),
            mergeMap(() => this.store.select(AppState.getPlayers(id)))
          )
        )
      )
      .subscribe((players) => {
        this.players = players;
        this.sortedPlayers = players;
      });
  }

  sortByPoints(key: string): void {
    this.sortedPlayers = orderBy(this.players, key, this.sortOrder);
    this.sortOrder = this.sortOrder === 'desc' ? 'asc' : 'desc';
  }
}
