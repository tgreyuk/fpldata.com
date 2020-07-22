import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Entry, ScoreCard } from 'src/app/core/data.service.types';

import { DataService } from '../../core/data.service';

@Component({
  selector: 'app-scorecard',
  templateUrl: './scorecard.component.html',
  styleUrls: ['./scorecard.component.scss'],
})
export class ScoreCardComponent implements OnInit {
  entry: Entry;
  scoreCard: ScoreCard;

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.dataService.getEntry(params.id).subscribe((entry) => {
        this.entry = entry;
        this.scoreCard = entry.scoreCard;
        console.log(this.scoreCard);
      });
    });
  }

  getAmountClass(points: number): any {
    return points < 0 ? 'minus' : 'plus';
  }
}
