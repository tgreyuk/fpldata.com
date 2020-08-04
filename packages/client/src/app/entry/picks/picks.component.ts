import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngxs/store';
import orderBy from 'lodash/orderBy';
import { Subject } from 'rxjs';
import { mergeMap, take } from 'rxjs/operators';
import { GetPlayers } from 'src/app/core/store/store.actions';
import { AppState } from 'src/app/core/store/store.state';

@Component({
  selector: 'app-players',
  templateUrl: './picks.component.html',
  styleUrls: ['./picks.component.scss'],
})
export class PicksComponent implements OnInit {
  destroy$ = new Subject<void>();
  entry: any;
  players: any;
  sortedPlayers: any;
  sortOrder: 'desc' | 'asc';
  constructor(private route: ActivatedRoute, private store: Store) {}

  ngOnInit() {
    const entryId = this.route.parent.snapshot.paramMap.get('id');

    this.store
      .dispatch(new GetPlayers(entryId))
      .pipe(
        take(1),
        mergeMap(() => this.store.select(AppState.getPlayers(entryId)))
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
