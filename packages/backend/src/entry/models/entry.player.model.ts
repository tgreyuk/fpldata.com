import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Player {
  webName: string;
  played: number;
  minutes: number;
  goalsScored: number;
  assists: number;
  basePoints: number;
  captainPoints: number;
  totalPoints: number;
  average: number;
}
