import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';
import { print } from 'graphql/language/printer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { Entry } from './api.types';

interface QueryResult {
  entry: Entry;
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getEntry(id: string): Observable<Entry> {
    return this.query(
      gql`
        query($id: Int!) {
          entry(id: $id) {
            summary {
              name
              flagIso
              overallPoints
              overallRank
            }
          }
        }
      `,
      { id: parseInt(id, 0) }
    ).pipe(map((result) => result.entry));
  }

  getPicks(id: string): Observable<Entry> {
    return this.query(
      gql`
        query($id: Int!) {
          entry(id: $id) {
            picks {
              type
              webName
              played
              minutes
              goalsScored
              cleanSheets
              assists
              saves
              basePoints
              captainPoints
              totalPoints
              average
              bonus
              penaltiesSaved
              ownGoals
              penaltiesMissed
              yellowCards
              redCards
            }
          }
        }
      `,
      { id: parseInt(id, 0) }
    ).pipe(map((result) => result.entry));
  }

  getScorecard(id: string): Observable<Entry> {
    return this.query(
      gql`
        query($id: Int!) {
          entry(id: $id) {
            scorecard {
              grossTotal
              transferCost
              netTotal
              actions {
                description
                points
                value
                valuex1
                valuex2
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
      .post<{ data: QueryResult }>(environment.apiUrl, {
        query: print(query),
        variables,
      })
      .pipe(map((result) => result.data));
  }
}
