import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LookupComponent } from './lookup/lookup.component';

const routes: Routes = [
  { path: '', component: LookupComponent },
  {
    path: ':id',

    children: [
      {
        path: '',
        loadChildren: () =>
          import('./features/scorecard/scorecard.module').then(
            (m) => m.ScoreCardModule
          ),
      },
    ],
  },
  { path: 'error', component: LookupComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
