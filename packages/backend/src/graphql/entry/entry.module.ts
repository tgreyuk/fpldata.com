import { HttpModule, Module } from '@nestjs/common';
import { ApiService } from 'src/fplapi/api.service';

import { EntryResolver } from './entry.resolver';

@Module({
  imports: [
    HttpModule.register({
      baseURL: 'https://fantasy.premierleague.com/api',
    }),
  ],
  providers: [EntryResolver, ApiService],
})
export class EntryModule {}
