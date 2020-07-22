import { ObjectType } from '@nestjs/graphql';

import { ScoreCardAction } from './entry.score-card.action.model';

@ObjectType()
export class ScoreCard {
  grossTotal: number;
  actions: ScoreCardAction[];
  transferCost: number;
  netTotal: number;
}
