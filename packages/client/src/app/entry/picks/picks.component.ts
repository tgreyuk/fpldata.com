import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngxs/store';
import { Dictionary } from 'lodash';
import groupBy from 'lodash/groupBy';
import { mergeMap, take } from 'rxjs/operators';
import { Pick } from 'src/app/core/api/api.types';
import { GetPlayers } from 'src/app/core/store/store.actions';
import { AppState } from 'src/app/core/store/store.state';

@Component({
  selector: 'app-players',
  templateUrl: './picks.component.html',
  styleUrls: ['./picks.component.scss'],
})
export class PicksComponent implements OnInit {
  picks: Dictionary<Pick[]>;

  constructor(private route: ActivatedRoute, private store: Store) {}

  ngOnInit() {
    const entryId = this.route.parent.snapshot.paramMap.get('id');

    this.store
      .dispatch(new GetPlayers(entryId))
      .pipe(
        take(1),
        mergeMap(() => this.store.select(AppState.getPlayers(entryId)))
      )
      .subscribe((picks) => {
        this.picks = groupBy(picks, 'type');
      });
  }
}
