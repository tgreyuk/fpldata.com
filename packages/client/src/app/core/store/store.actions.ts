export class GetRouteId {
  static readonly type = '[Store] Get route id';
  constructor(public id: string) {}
}

export class GetEntryById {
  static readonly type = '[Store] Get summary ';
  constructor(public id: string) {}
}

export class GetPlayers {
  static readonly type = '[Store] Get players';
  constructor(public id: string) {}
}

export class GetScorecard {
  static readonly type = '[Store] Get scorecard';
  constructor(public id: string) {}
}
