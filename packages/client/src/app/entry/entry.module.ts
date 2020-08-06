import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DashboardComponent } from './dashboard/dashboard.component';
import { EntryRoutingModule } from './entry-routing.module';
import { EntryComponent } from './entry.component';
import { PicksComponent } from './picks/picks.component';
import { ScorecardComponent } from './scorecard/scorecard.component';
import { HeaderComponent } from './shared/header/header.component';
import { MenuComponent } from './shared/menu/menu.component';
import { PicksTableComponent } from './picks/picks-table/picks-table.component';

@NgModule({
  declarations: [
    EntryComponent,
    DashboardComponent,
    PicksComponent,
    ScorecardComponent,
    HeaderComponent,
    MenuComponent,
    PicksTableComponent,
  ],
  imports: [CommonModule, EntryRoutingModule],
})
export class EntryModule {}
