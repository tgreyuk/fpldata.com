import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { EntryComponent } from './entry.component';
import { PicksComponent } from './picks/picks.component';
import { ScorecardComponent } from './scorecard/scorecard.component';

const routes: Routes = [
  {
    path: '',
    component: EntryComponent,
    children: [
      { path: '', redirectTo: 'scorecard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'picks', component: PicksComponent },
      { path: 'scorecard', component: ScorecardComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EntryRoutingModule {}
