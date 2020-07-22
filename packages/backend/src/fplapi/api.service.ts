import { HttpService, Injectable } from '@nestjs/common';
import * as humps from 'humps';
import * as NodeCache from 'node-cache';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { BootstrapStatic } from './typings/interfaces/bootstrap-static.interface';
import { Elements } from './typings/interfaces/elements.interface';
import { EntryHistory } from './typings/interfaces/entry-history.interface';
import { EntryPicksResponse } from './typings/interfaces/entry-picks-response.interface';
import { Entry } from './typings/interfaces/entry.interface';
import { EventLive } from './typings/interfaces/event-live.interface';
import { EventStatus } from './typings/interfaces/event-status.interface';

@Injectable()
export class ApiService {
  private apiCache: NodeCache;
  public currentEvent: number;
  public elements: Elements;
  public liveEvents: EventLive[];

  constructor(private httpService: HttpService) {
    this.apiCache = new NodeCache();
    this.bootstrap();
  }

  bootstrap(): any {
    this.getBootstrapStatic().subscribe(bootstrapStatic => {
      this.elements = bootstrapStatic.elements;
    });
  }

  getData<T>(key: string): Observable<T> {
    const result = this.apiCache.get(key);
    if (result === undefined) {
      return this.httpService.get(key).pipe(
        map(response => humps.camelizeKeys(response.data)),
        tap(data => this.apiCache.set(key, data)),
      ) as Observable<T>;
    }
    return of(result) as Observable<T>;
  }

  getBootstrapStatic() {
    return this.getData<BootstrapStatic>(`/bootstrap-static/`);
  }

  getEventStatus() {
    return this.getData<EventStatus>(`/event-status/`);
  }

  getEntry(id: number) {
    return this.getData<Entry>(`/entry/${id}/`);
  }

  getEntryHistory(id: number) {
    return this.getData<EntryHistory>(`/entry/${id}/history/`);
  }

  getEntryPicksBatch(id: number, currentEvent: number) {
    const observables: Observable<EntryPicksResponse>[] = [];
    for (let i = 0; i < currentEvent; i++) {
      observables.push(
        this.getData<EntryPicksResponse>(`/entry/${id}/event/${i + 1}/picks/`),
      );
    }
    return observables;
  }

  getEventLiveBatch(currentEvent: number) {
    const observables: Observable<EventLive>[] = [];
    for (let i = 0; i < currentEvent; i++) {
      observables.push(this.getData<EventLive>(`/event/${i + 1}/live/`));
    }
    return observables;
  }
}
