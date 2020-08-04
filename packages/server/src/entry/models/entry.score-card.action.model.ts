import { ObjectType, registerEnumType } from '@nestjs/graphql';

export enum ScoreActionType {
  PLAYED_UPTO_60_MINS,
  PLAYED_60_PLUS_MINS,
  GOALS_SCORED_DEF,
  GOALS_SCORED_MID,
  GOALS_SCORED_FWD,
  ASSISTS,
  CLEAN_SHEETS_DEF,
  CLEAN_SHEETS_MID,
  BONUS_1,
  BONUS_2,
  BONUS_3,
  PENALTIES_SAVED,
  EVERY_3_SAVES,
  OWN_GOALS,
  YELLOW_CARDS,
  RED_CARDS,
  EVERY_2_GOALS_CONCEDED,
  PENALTIES_MISSED,
}

registerEnumType(ScoreActionType, {
  name: 'ScoreActionType',
});

@ObjectType()
export class ScorecardAction {
  type: ScoreActionType;
  description: string;
  points: number;
  value: number;
  valuex1: number;
  valuex2: number;
  valuex3: number;
  total: number;
}
