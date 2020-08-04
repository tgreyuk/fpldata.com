import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ScoreCardPlayer {
  webname: string;
  value: number;
}
