import { ObjectType } from '@nestjs/graphql';

import { ScorecardAction } from './entry.score-card.action.model';

@ObjectType()
export class Scorecard {
  grossTotal: number;
  actions: ScorecardAction[];
  transferCost: number;
  netTotal: number;
}
