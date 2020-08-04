import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Subject } from 'rxjs';
import { mergeMap, switchMap, take } from 'rxjs/operators';
import { Summary } from 'src/app/core/api/api.types';
import { GetEntryById } from 'src/app/core/store/store.actions';
import { AppState } from 'src/app/core/store/store.state';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  destroy$ = new Subject<void>();
  entry: Summary;
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store
      .select(AppState.getRouteId())
      .pipe(
        take(1),
        switchMap((id) =>
          this.store.dispatch(new GetEntryById(id)).pipe(
            take(1),
            mergeMap(() => this.store.select(AppState.getEntryById(id)))
          )
        )
      )
      .subscribe((entry) => {
        this.entry = entry;
      });
  }
}
