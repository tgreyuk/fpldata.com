import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';
import { print } from 'graphql/language/printer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Entry } from './data.service.types';

interface QueryResult {
  entry: Entry;
}

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  getEntry(id: string): Observable<Entry> {
    return this.query(
      gql`
        query($id: Int!) {
          entry(id: $id) {
            currentEvent
            lastName
            flagIso
            scoreCard {
              grossTotal
              transferCost
              netTotal

              actions {
                description
                points
                value
                valuex1
                valuex2
                valuex3
                total
              }
            }
          }
        }
      `,
      { id: parseInt(id, 0) }
    ).pipe(map((result) => result.entry));
  }

  private query(query: DocumentNode, variables: {}): Observable<QueryResult> {
    return this.http
      .post<{ data: QueryResult }>(`http://localhost:3000/graphql`, {
        query: print(query),
        variables,
      })
      .pipe(map((result) => result.data));
  }
}
