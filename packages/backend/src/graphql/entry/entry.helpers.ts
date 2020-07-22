import { ScoreActionType } from './models/entry.score-card.action.model';

const isDEF = (elementType: number) => elementType === 1 || elementType === 2;
const isMID = (elementType: number) => elementType === 3;
const isFWD = (elementType: number) => elementType === 4;

export const getStats: {
  [key: string]: (
    value: number,
    elementType?: number,
  ) => { type: ScoreActionType; value: number };
} = {
  ['minutes']: (value: number) => {
    if (value >= 60) {
      return { type: ScoreActionType.PLAYED_60_PLUS_MINS, value: 1 };
    }
    if (value > 0 && value < 60) {
      return { type: ScoreActionType.PLAYED_UPTO_60_MINS, value: 1 };
    }
    return null;
  },
  ['goals_scored']: (value: number, elementType: number) => {
    if (isDEF(elementType)) {
      return { type: ScoreActionType.GOALS_SCORED_DEF, value };
    }
    if (isMID(elementType)) {
      return { type: ScoreActionType.GOALS_SCORED_MID, value };
    }
    if (isFWD(elementType)) {
      return { type: ScoreActionType.GOALS_SCORED_FWD, value };
    }
  },
  ['assists']: (value: number) => ({
    type: ScoreActionType.ASSISTS,
    value,
  }),
  ['clean_sheets']: (value: number, elementType: number) => {
    if (isDEF(elementType)) {
      return { type: ScoreActionType.CLEAN_SHEETS_DEF, value };
    }
    if (isMID(elementType)) {
      return { type: ScoreActionType.CLEAN_SHEETS_MID, value };
    }
  },
  ['bonus']: (value: number) => {
    if (value === 1) {
      return { type: ScoreActionType.BONUS_1, value: 1 };
    }
    if (value === 2) {
      return { type: ScoreActionType.BONUS_2, value: 1 };
    }
    if (value === 3) {
      return { type: ScoreActionType.BONUS_3, value: 1 };
    }
  },
  ['saves']: (value: number) => ({
    type: ScoreActionType.EVERY_3_SAVES,
    value: Math.floor(value / 3),
  }),

  ['goals_conceded']: (value: number) => ({
    type: ScoreActionType.EVERY_2_GOALS_CONCEDED,
    value: Math.floor(value / 2),
    penalty: true,
  }),
  ['own_goals']: (value: number) => ({
    type: ScoreActionType.OWN_GOALS,
    value,
    penalty: true,
  }),
  ['penalties_saved']: (value: number) => ({
    type: ScoreActionType.PENALTIES_SAVED,
    value,
  }),
  ['penalties_missed']: (value: number) => ({
    type: ScoreActionType.PENALTIES_MISSED,
    value,
    penalty: true,
  }),
  ['yellow_cards']: (value: number) => ({
    type: ScoreActionType.YELLOW_CARDS,
    value,
    penalty: true,
  }),
  ['red_cards']: (value: number) => ({
    type: ScoreActionType.RED_CARDS,
    value,
    penalty: true,
  }),
};

export const initialState = () => ({
  grossTotal: 0,
  netTotal: 0,
  transferCost: 0,
  actions: [
    {
      type: ScoreActionType.PLAYED_UPTO_60_MINS,
      description: 'Played up to 60 minutes',
      points: 1,
    },
    {
      type: ScoreActionType.PLAYED_60_PLUS_MINS,
      description: 'Played 60 minutes or more',
      points: 2,
    },
    {
      type: ScoreActionType.GOALS_SCORED_DEF,
      description: 'Goal scored by a GKP or DEF',
      points: 6,
    },
    {
      type: ScoreActionType.GOALS_SCORED_MID,
      description: 'Goal scored by a MID',
      points: 5,
    },
    {
      type: ScoreActionType.GOALS_SCORED_FWD,
      description: 'Goal scored by a FWD',
      points: 4,
    },
    {
      type: ScoreActionType.ASSISTS,
      description: 'Goal assist',
      points: 3,
    },
    {
      type: ScoreActionType.CLEAN_SHEETS_DEF,
      description: 'Clean sheet by a GKP or DEF',
      points: 4,
    },
    {
      type: ScoreActionType.CLEAN_SHEETS_MID,
      description: 'Clean sheet by a MID',
      points: 1,
    },
    {
      type: ScoreActionType.EVERY_3_SAVES,
      description: 'Every 3 shot saves by a GKP',
      points: 1,
    },
    {
      type: ScoreActionType.PENALTIES_SAVED,
      description: 'Penalty save',
      points: 5,
    },
    {
      type: ScoreActionType.BONUS_1,
      description: 'Bonus(x1) points in a match',
      points: 1,
    },
    {
      type: ScoreActionType.BONUS_2,
      description: 'Bonus(x2) points in a match',
      points: 2,
    },
    {
      type: ScoreActionType.BONUS_3,
      description: 'Bonus(x3) points in a match',
      points: 3,
    },

    {
      type: ScoreActionType.PENALTIES_MISSED,
      description: 'Penalty miss',
      points: -2,
    },

    {
      type: ScoreActionType.EVERY_2_GOALS_CONCEDED,
      description: 'Every 2 goals conceded by a GKP or DEF',
      points: -1,
    },
    {
      type: ScoreActionType.YELLOW_CARDS,
      description: 'Yellow card',
      points: -1,
    },
    {
      type: ScoreActionType.RED_CARDS,
      description: 'Red card',
      points: -3,
    },
    {
      type: ScoreActionType.OWN_GOALS,
      description: 'Own goal',
      points: -2,
    },
  ],
});

export const getFlagIso = (region: string) => {
  if (region === 'EN') {
    return 'gb-eng';
  }
  if (region === 'WA') {
    return 'gb-wls';
  }
  if (region === 'S1') {
    return 'gb-sct';
  }
  return region.toLowerCase();
};
