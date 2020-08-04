import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngxs/store';
import { mergeMap, take } from 'rxjs/operators';
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

  constructor(private route: ActivatedRoute, private store: Store) {}
  ngOnInit() {
    const entryId = this.route.parent.snapshot.paramMap.get('id');

    this.store
      .dispatch(new GetScorecard(entryId))
      .pipe(
        take(1),
        mergeMap(() => this.store.select(AppState.getScorecard(entryId)))
      )

      .subscribe((scorecard) => {
        this.scorecard = scorecard;
      });
  }

  getAmountClass(points: number): any {
    return points < 0 ? 'minus' : 'plus';
  }
}
