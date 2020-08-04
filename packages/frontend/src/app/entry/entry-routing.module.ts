import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { EntryComponent } from './entry.component';
import { PlayersComponent } from './players/players.component';
import { ScorecardComponent } from './scorecard/scorecard.component';

const routes: Routes = [
  {
    path: '',
    component: EntryComponent,
    children: [
      { path: '', component: DashboardComponent },
      { path: 'players', component: PlayersComponent },
      { path: 'scorecard', component: ScorecardComponent },
      /*
      {
        path: 'players',
        loadChildren: () =>
          import('../features/players/players.module').then(
            (m) => m.PlayersModule
          ),
      },
      {
        path: 'scorecard',
        loadChildren: () =>
          import('../features/scorecard/scorecard.module').then(
            (m) => m.ScoreCardModule
          ),
      },*/
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EntryRoutingModule {}
