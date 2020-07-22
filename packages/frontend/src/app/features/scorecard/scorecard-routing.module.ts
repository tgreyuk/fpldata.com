import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ScoreCardComponent } from './scorecard.component';

const routes: Routes = [
  {
    path: '',
    component: ScoreCardComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScoreCardRoutingModule {}
