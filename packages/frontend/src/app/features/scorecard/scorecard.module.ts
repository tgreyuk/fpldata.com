import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ScoreCardRoutingModule } from './scorecard-routing.module';
import { ScoreCardComponent } from './scorecard.component';

@NgModule({
  declarations: [ScoreCardComponent],
  imports: [CommonModule, ScoreCardRoutingModule],
})
export class ScoreCardModule {}
