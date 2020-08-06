import { Injectable, OnModuleInit } from '@nestjs/common';
import got from 'got';
import * as humps from 'humps';
import * as NodeCache from 'node-cache';
import { Observable, forkJoin, from, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { BootstrapStatic } from './typings/interfaces/bootstrap-static.interface';
import { Elements } from './typings/interfaces/elements.interface';
import { EntryHistory } from './typings/interfaces/entry-history.interface';
import { EntryPicksResponse } from './typings/interfaces/entry-picks-response.interface';
import { Entry } from './typings/interfaces/entry.interface';
import { EventLive } from './typings/interfaces/event-live.interface';
import { EventStatus } from './typings/interfaces/event-status.interface';

@Injectable()
export class ApiService implements OnModuleInit {
  private apiCache: NodeCache;
  public currentEvent: number;
  public elements: Elements;
  public liveEvents: EventLive[];

  constructor() {
    this.apiCache = new NodeCache();
  }

  onModuleInit() {
    this.getBootstrapStatic().subscribe((bootstrapStatic) => {
      this.elements = bootstrapStatic.elements;
      this.currentEvent = bootstrapStatic.events.find(
        (event) => event.isCurrent,
      ).id;
      forkJoin(this.getEventLiveBatch(this.currentEvent)).subscribe(
        (liveEvents) => (this.liveEvents = liveEvents),
      );
    });
  }

  getData<T>(key: string): Observable<T> {
    const result = this.apiCache.get(key);
    if (result === undefined) {
      return from(this.get(key)).pipe(
        map((response) => humps.camelizeKeys(response)),
        tap((data) => this.apiCache.set(key, data)),
      ) as Observable<T>;
    }
    return of(result) as Observable<T>;
  }

  async get(key: string) {
    const response = await got(
      `https://fantasy.premierleague.com/api/${key}/`,
    ).json();
    return response as any;
  }

  getBootstrapStatic() {
    return this.getData<BootstrapStatic>(`bootstrap-static`);
  }

  getEventStatus() {
    return this.getData<EventStatus>(`event-status`);
  }

  getEntry(id: number) {
    return this.getData<Entry>(`entry/${id}`);
  }

  getEntryHistory(id: number) {
    return this.getData<EntryHistory>(`entry/${id}/history`);
  }

  getEntryPicksBatch(id: number) {
    const observables: Observable<EntryPicksResponse>[] = [];
    for (let i = 0; i < this.currentEvent; i++) {
      observables.push(
        this.getData<EntryPicksResponse>(`entry/${id}/event/${i + 1}/picks`),
      );
    }
    return observables;
  }

  getEventLiveBatch(currentEvent: number) {
    const observables: Observable<EventLive>[] = [];
    for (let i = 0; i < currentEvent; i++) {
      observables.push(this.getData<EventLive>(`event/${i + 1}/live`));
    }
    return observables;
  }
}
