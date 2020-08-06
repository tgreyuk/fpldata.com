import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Pick {
  type: number;
  webName: string;
  played: number;
  minutes: number;
  goalsScored: number;
  cleanSheets?: number;
  assists: number;
  saves?: number;
  penaltiesSaved?: number;
  basePoints: number;
  captainPoints: number;
  totalPoints: number;
  average: number;
  bonus: number;
  ownGoals?: number;
  penaltiesMissed?: number;
  yellowCards?: number;
  redCards?: number;
}
