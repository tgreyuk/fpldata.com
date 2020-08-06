import { Component, Input, OnInit } from '@angular/core';
import lowerCase from 'lodash/lowerCase';
import orderBy from 'lodash/orderBy';
import { Pick } from 'src/app/core/api/api.types';

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
    played: 'p',
    bonus: 'b',
    penaltiesMissed: 'pm',
    penaltiesSaved: 'ps',
    saves: 's',
    goalsScored: 'g',
    cleanSheets: 'cs',
    totalPoints: 'pts',
    average: 'av',
    assists: 'a',
    ownGoals: 'og',
    yellowCards: 'yc',
    redCards: 'rc',
    minutes: 'm',
  };

  constructor() {}

  ngOnInit(): void {
    this.sort(['minutes']);
    this.cols = [
      'webName',
      'minutes',
      'bonus',
      ...this.cols,
      'ownGoals',
      'yellowCards',
      'redCards',
      'totalPoints',
      'average',
    ];
  }
  getLabel(key: string) {
    return this.statsMap[key] || key;
  }

  getDescription(key: string) {
    return lowerCase(key);
  }

  sort(key: string | string[]) {
    this.sortedPicks = orderBy(this.picks, key, this.sortOrder);
    this.sortOrder = this.sortOrder === 'desc' ? 'asc' : 'desc';
  }

  get legend() {
    return this.cols.filter((key) => key !== 'webName');
  }
}
