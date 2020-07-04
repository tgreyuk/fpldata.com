import { HttpModule, Module } from '@nestjs/common';
import { DataLoaderService } from 'src/dataloader/dataloader.service';

import { EntryResolver } from './entry.resolver';

@Module({
  imports: [
    HttpModule.register({
      baseURL: 'https://fantasy.premierleague.com/api/',
    }),
  ],
  providers: [EntryResolver, DataLoaderService],
})
export class EntryModule {}
