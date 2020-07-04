import { Query, Resolver, Args, Int } from '@nestjs/graphql';
import { map } from 'rxjs/operators';
import { Entry } from './entry.model';
import { DataLoaderService } from '../../dataloader/dataloader.service';

@Resolver(() => Entry)
export class EntryResolver {
  constructor(private dataLoaderService: DataLoaderService) {}

  @Query(() => Entry)
  async entry(@Args('id', { type: () => Int }) id: number) {
    return this.dataLoaderService.entryLoader(id).then(result => {
      return result.pipe(
        map(entry => {
          return {
            firstName: entry.playerFirstName,
            lastName: entry.playerLastName,
            region: entry.playerRegionName,
            flagIso: this.getFlagIso(entry.playerRegionIsoCodeShort),
          };
        }),
      );
    });
  }

  getFlagIso(region: string) {
    if (region === 'EN') {
      return 'gb-eng';
    }
    if (region === 'NN') {
      return 'gb-nir';
    }
    if (region === 'WA') {
      return 'gb-wls';
    }
    if (region === 'S1') {
      return 'gb-sct';
    }
    return region.toLowerCase();
  }
}
