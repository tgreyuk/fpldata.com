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
          import('./features/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
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
