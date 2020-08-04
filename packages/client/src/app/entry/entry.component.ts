import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngxs/store';
import { mergeMap, take } from 'rxjs/operators';

import { Summary } from '../core/api/api.types';
import { GetEntryById, GetRouteId } from '../core/store/store.actions';
import { AppState } from '../core/store/store.state';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.scss'],
})
export class EntryComponent implements OnInit {
  entry: Summary;

  constructor(private route: ActivatedRoute, private store: Store) {}

  ngOnInit() {
    const entryId = this.route.snapshot.paramMap.get('id');
    this.store.dispatch(new GetRouteId(entryId));
    this.store
      .dispatch(new GetEntryById(entryId))
      .pipe(
        take(1),
        mergeMap(() => this.store.select(AppState.getEntryById(entryId)))
      )
      .subscribe((entry) => {
        this.entry = entry;
      });
  }
}
