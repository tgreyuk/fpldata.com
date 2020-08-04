
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export enum ScoreActionType {
    PLAYED_UPTO_60_MINS = "PLAYED_UPTO_60_MINS",
    PLAYED_60_PLUS_MINS = "PLAYED_60_PLUS_MINS",
    GOALS_SCORED_DEF = "GOALS_SCORED_DEF",
    GOALS_SCORED_MID = "GOALS_SCORED_MID",
    GOALS_SCORED_FWD = "GOALS_SCORED_FWD",
    ASSISTS = "ASSISTS",
    CLEAN_SHEETS_DEF = "CLEAN_SHEETS_DEF",
    CLEAN_SHEETS_MID = "CLEAN_SHEETS_MID",
    BONUS_1 = "BONUS_1",
    BONUS_2 = "BONUS_2",
    BONUS_3 = "BONUS_3",
    PENALTIES_SAVED = "PENALTIES_SAVED",
    EVERY_3_SAVES = "EVERY_3_SAVES",
    OWN_GOALS = "OWN_GOALS",
    YELLOW_CARDS = "YELLOW_CARDS",
    RED_CARDS = "RED_CARDS",
    EVERY_2_GOALS_CONCEDED = "EVERY_2_GOALS_CONCEDED",
    PENALTIES_MISSED = "PENALTIES_MISSED"
}

export interface Entry {
    id: number;
    summary: Summary;
    scorecard: Scorecard;
    players: Player[];
}

export interface Player {
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

export interface IQuery {
    entry(id: number): Entry | Promise<Entry>;
}

export interface Scorecard {
    grossTotal: number;
    actions: ScorecardAction[];
    transferCost: number;
    netTotal: number;
}

export interface ScorecardAction {
    type: ScoreActionType;
    description: string;
    points: number;
    value: number;
    valuex1: number;
    valuex2: number;
    valuex3: number;
    total: number;
}

export interface Summary {
    name: string;
    region: string;
    flagIso: string;
    overallPoints: number;
    overallRank: number;
}
