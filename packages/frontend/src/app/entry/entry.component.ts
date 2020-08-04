import {} from '../core/store/store.state';

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngxs/store';

import { GetRouteId } from '../core/store/store.actions';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.scss'],
})
export class EntryComponent implements OnInit {
  constructor(private route: ActivatedRoute, private store: Store) {}

  ngOnInit(): void {
    const entryId = this.route.snapshot.paramMap.get('id');
    this.store.dispatch(new GetRouteId(entryId));
  }
}
