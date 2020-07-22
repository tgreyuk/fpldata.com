import { ObjectType } from '@nestjs/graphql';

import { ScoreCard } from './entry.score-card.model';

@ObjectType()
export class Entry {
  id: number;
  firstName: string;
  lastName: string;
  region: string;
  flagIso: string;
  currentEvent: number;
  scoreCard: ScoreCard;
}
