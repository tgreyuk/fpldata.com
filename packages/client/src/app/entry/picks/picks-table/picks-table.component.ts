import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import lowerCase from 'lodash/lowerCase';
import orderBy from 'lodash/orderBy';
import { Pick } from 'src/app/core/api/api.types';

interface StatsMap {
  webName: string;
  minutes: string;
  bonus: string;
  penaltiesMissed: string;
  penaltiesSaved: string;
  saves: string;
  goalsScored: string;
  cleanSheets: string;
  totalPoints: string;
  average: string;
  assists: string;
  ownGoals: string;
  yellowCards: string;
  redCards: string;
}

@Component({
  selector: 'app-picks-table',
  templateUrl: './picks-table.component.html',
  styleUrls: ['./picks-table.component.scss'],
})
export class PicksTableComponent implements OnInit {
  @Input() picks: Pick[];
  @Input() title: string;
  @Input() cols: string[] = [];
  sortedPicks: Pick[];
  sortOrder: 'desc' | 'asc' = 'desc';
  statsMap = {
    webName: 'Player',
    minutes: 'm',
    bonus: 'b',
    penaltiesSaved: 'ps',
    saves: 's',
    cleanSheets: 'cs',
    goalsScored: 'g',
    assists: 'a',
    penaltiesMissed: 'pm',
    ownGoals: 'og',
    yellowCards: 'yc',
    redCards: 'rc',
    totalPoints: 'pts',
    average: 'av',
  };
  legend: { [key: string]: string }[];

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.sort(['minutes']);
    this.cols = [
      'minutes',
      'bonus',
      ...this.cols,
      'ownGoals',
      'yellowCards',
      'redCards',
      'totalPoints',
      'average',
    ];
    this.legend = Object.entries(this.statsMap)
      .filter(([key]) => key !== 'webName' && this.cols.includes(key))
      .map(([key, value]) => {
        return { key: value, value: lowerCase(key) };
      });
  }
  getLabel(key: string) {
    return this.statsMap[key] || key;
  }

  sort(key: string | string[]) {
    this.sortedPicks = orderBy(this.picks, key, this.sortOrder);
    this.sortOrder = this.sortOrder === 'desc' ? 'asc' : 'desc';
  }
}
