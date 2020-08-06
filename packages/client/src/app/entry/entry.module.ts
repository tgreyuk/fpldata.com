import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DashboardComponent } from './dashboard/dashboard.component';
import { EntryRoutingModule } from './entry-routing.module';
import { EntryComponent } from './entry.component';
import { PicksTableComponent } from './picks/picks-table/picks-table.component';
import { PicksComponent } from './picks/picks.component';
import { ScorecardComponent } from './scorecard/scorecard.component';
import { HeaderComponent } from './shared/header/header.component';

@NgModule({
  declarations: [
    EntryComponent,
    DashboardComponent,
    PicksComponent,
    ScorecardComponent,
    HeaderComponent,
    PicksTableComponent,
  ],
  imports: [CommonModule, EntryRoutingModule],
})
export class EntryModule {}
