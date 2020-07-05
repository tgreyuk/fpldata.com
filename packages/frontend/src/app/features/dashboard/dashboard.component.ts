import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Entry } from 'src/app/core/data.service.types';

import { DataService } from '../../core/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  entry: Entry;

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.dataService.getEntry(params.id).subscribe((entry) => {
        this.entry = entry;
      });
    });
  }
}
