import { ObjectType } from '@nestjs/graphql';

import { Player } from './entry.player.model';
import { Scorecard } from './entry.score-card.model';
import { Summary } from './entry.summary.model';

@ObjectType()
export class Entry {
  id: number;
  summary: Summary;
  scorecard: Scorecard;
  players: Player[];
}
