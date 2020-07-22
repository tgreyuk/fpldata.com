import {
  Args,
  Int,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { forkJoin } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { EntryPicksResponse } from 'src/fplapi/typings/interfaces/entry-picks-response.interface';
import { ApiService } from '../../fplapi/api.service';
import { getFlagIso, getStats, initialState } from './entry.helpers';
import { Entry } from './models/entry.model';
import { ScoreCard } from './models/entry.score-card.model';

@Resolver(() => Entry)
export class EntryResolver {
  constructor(private apiService: ApiService) {}

  @Query(() => Entry)
  async entry(@Args('id', { type: () => Int }) id: number) {
    return this.apiService.getEntry(id).pipe(
      map(entry => {
        return {
          id: entry.id,
          currentEvent: entry.currentEvent,
          firstName: entry.playerFirstName,
          lastName: entry.playerLastName,
          region: entry.playerRegionName,
          flagIso: getFlagIso(entry.playerRegionIsoCodeShort),
        };
      }),
    );
  }

  @ResolveField()
  async scoreCard(@Parent() entry: Entry) {
    const { id, currentEvent } = entry;
    return forkJoin(this.apiService.getEventLiveBatch(currentEvent)).pipe(
      switchMap(events => {
        return forkJoin(
          this.apiService.getEntryPicksBatch(id, currentEvent),
        ).pipe(
          map(results => {
            const reducer = (
              acc: ScoreCard,
              res: EntryPicksResponse,
              currentIndex: number,
            ) => {
              const currentEvent = events[currentIndex];
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
                        actionToUpdate.valuex1 =
                          actionToUpdate.valuex1 + valuex1;
                        actionToUpdate.valuex2 =
                          actionToUpdate.valuex2 + valuex2;
                        actionToUpdate.valuex3 =
                          actionToUpdate.valuex3 + valuex3;
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
            const scoreCard = results.reduce(reducer, {
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
              ...scoreCard,
              // grossTotal: scoreCard.total,
              netTotal: scoreCard.grossTotal + scoreCard.transferCost,
            };
          }),
        );
      }),
    );
  }
}
