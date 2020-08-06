import {
  Args,
  Int,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from '../api/api.service';
import { EntryPicksResponse } from '../api/typings/interfaces/entry-picks-response.interface';
import {
  getFlagIso,
  getStats,
  initialState,
  isDEF,
  isGKP,
  isMID,
} from './entry.helpers';
import { Entry } from './models/entry.model';
import { Pick } from './models/entry.picks-pick.model';
import { Scorecard } from './models/entry.score-card.model';

@Resolver(() => Entry)
export class EntryResolver {
  constructor(private apiService: ApiService) {}

  @Query(() => Entry)
  async entry(@Args('id', { type: () => Int }) id: number) {
    return this.apiService.getEntry(id).pipe(
      map(entry => {
        return {
          id: entry.id,
          summary: {
            name: entry.name,
            region: entry.playerRegionName,
            flagIso: getFlagIso(entry.playerRegionIsoCodeShort),
            overallPoints: entry.summaryOverallPoints,
            overallRank: entry.summaryOverallRank,
          },
        };
      }),
    );
  }

  @ResolveField()
  async picks(@Parent() entry: Entry) {
    const { id } = entry;
    return forkJoin(this.apiService.getEntryPicksBatch(id)).pipe(
      map(results => {
        const reducer = (
          acc: Pick[],
          res: EntryPicksResponse,
          currentIndex: number,
        ) => {
          const currentEvent = this.apiService.liveEvents[currentIndex];
          const elements = currentEvent.elements;

          res.picks.forEach(pick => {
            if (pick.multiplier > 0) {
              const currentPick = elements.find(
                element => element.id === pick.element,
              );
              const element = this.apiService.elements.find(
                element => element.id === pick.element,
              );

              if (currentPick.stats.minutes > 0) {
                let elementToUpdate = acc.find(
                  player => player.webName === element.webName,
                );
                const elementType = element.elementType;
                if (!elementToUpdate) {
                  elementToUpdate = {
                    type: elementType,
                    webName: element.webName,
                    played: 0,
                    minutes: 0,
                    goalsScored: 0,
                    assists: 0,
                    saves: 0,
                    cleanSheets: 0,
                    basePoints: 0,
                    captainPoints: 0,
                    totalPoints: 0,
                    average: 0,
                    bonus: 0,
                    penaltiesSaved: 0,
                    penaltiesMissed: 0,
                    ownGoals: 0,
                    yellowCards: 0,
                    redCards: 0,
                  };
                  acc.push(elementToUpdate);
                }

                const addStat = (stat: string) => {
                  elementToUpdate[stat] =
                    elementToUpdate[stat] + currentPick.stats[stat];
                };

                const addProp = (prop: string, value: number) => {
                  elementToUpdate[prop] = elementToUpdate[prop] + value;
                };

                const basePoints = currentPick.stats.totalPoints;
                const totalPoints = basePoints * pick.multiplier;
                const captainPoints = totalPoints - basePoints;

                addProp('played', 1);
                addProp('basePoints', basePoints);
                addProp('totalPoints', totalPoints);
                addProp('captainPoints', captainPoints);

                addStat('minutes');
                addStat('goalsScored');
                addStat('assists');
                addStat('bonus');
                addStat('ownGoals');
                addStat('penaltiesMissed');
                addStat('yellowCards');
                addStat('redCards');

                if (isGKP) {
                  addStat('saves');
                  addStat('penaltiesSaved');
                }

                if (
                  isGKP(elementType) ||
                  isDEF(elementType) ||
                  isMID(elementType)
                ) {
                  addStat('cleanSheets');
                }
              }
            }
          });
          return acc;
        };

        const picks = results.reduce(reducer, []);
        return picks.map(pick => {
          return {
            ...pick,
            average: (pick.totalPoints / pick.played).toFixed(2),
          };
        });
      }),
    );
  }

  @ResolveField()
  async scorecard(@Parent() entry: Entry) {
    const { id } = entry;
    return forkJoin(this.apiService.getEntryPicksBatch(id)).pipe(
      map(results => {
        const reducer = (
          acc: Scorecard,
          res: EntryPicksResponse,
          currentIndex: number,
        ) => {
          const currentEvent = this.apiService.liveEvents[currentIndex];
          let eventScore = 0;
          const elements = currentEvent.elements;
          const transferCost = res.entryHistory.eventTransfersCost;
          acc.transferCost = acc.transferCost - transferCost;
          res.picks.forEach(pick => {
            const currentPick = elements.find(
              element => element.id === pick.element,
            );
            const element = this.apiService.elements.find(
              element => element.id === pick.element,
            );
            const elementType = element.elementType;
            currentPick.explain.forEach(explain => {
              explain.stats.forEach(stat => {
                if (pick.multiplier > 0) {
                  const statToUpdate = getStats[stat.identifier](
                    stat.value,
                    elementType,
                  );
                  if (statToUpdate) {
                    const actionToUpdate = acc.actions.find(
                      acc => acc.type === statToUpdate.type,
                    );
                    const value = statToUpdate.value * pick.multiplier;
                    const valuex1 = statToUpdate.value;
                    const valuex2 =
                      pick.multiplier === 2 ? statToUpdate.value : 0;
                    const valuex3 =
                      pick.multiplier === 3 ? statToUpdate.value : 0;
                    const total = value * actionToUpdate.points;
                    actionToUpdate.value = actionToUpdate.value + value;
                    actionToUpdate.valuex1 = actionToUpdate.valuex1 + valuex1;
                    actionToUpdate.valuex2 = actionToUpdate.valuex2 + valuex2;
                    actionToUpdate.valuex3 = actionToUpdate.valuex3 + valuex3;
                    actionToUpdate.total = actionToUpdate.total + total;
                    acc.grossTotal = acc.grossTotal + total;
                    eventScore = eventScore + total;
                  }
                }
              });
            });
          });
          return acc;
        };

        const state = initialState();
        const scorecard = results.reduce(reducer, {
          ...state,
          actions: state.actions.map(action => ({
            ...action,
            value: 0,
            valuex1: 0,
            valuex2: 0,
            valuex3: 0,
            total: 0,
          })),
        });
        return {
          ...scorecard,
          netTotal: scorecard.grossTotal + scorecard.transferCost,
        };
      }),
    );
  }
}
