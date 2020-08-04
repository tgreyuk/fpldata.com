import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { mergeMap, switchMap, take } from 'rxjs/operators';
import { Entry, Scorecard } from 'src/app/core/api/api.types';
import { GetScorecard } from 'src/app/core/store/store.actions';
import { AppState } from 'src/app/core/store/store.state';

@Component({
  selector: 'app-scorecard',
  templateUrl: './scorecard.component.html',
  styleUrls: ['./scorecard.component.scss'],
})
export class ScorecardComponent implements OnInit {
  entry: Entry;
  scorecard: Scorecard;

  constructor(private store: Store) {}
  ngOnInit() {
    this.store
      .select(AppState.getRouteId())
      .pipe(
        take(1),
        switchMap((id) =>
          this.store.dispatch(new GetScorecard(id)).pipe(
            take(1),
            mergeMap(() => this.store.select(AppState.getScorecard(id)))
          )
        )
      )
      .subscribe((scorecard) => {
        this.scorecard = scorecard;
      });
  }

  getAmountClass(points: number): any {
    return points < 0 ? 'minus' : 'plus';
  }
}
