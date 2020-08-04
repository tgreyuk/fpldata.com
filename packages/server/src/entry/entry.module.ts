import { HttpModule, Module } from '@nestjs/common';

import { ApiService } from '../api/api.service';
import { EntryResolver } from './entry.resolver';

@Module({
  imports: [
    HttpModule.register({
      baseURL: 'https://fantasy.premierleague.com/api',
    }),
  ],
  providers: [ApiService, EntryResolver],
})
export class EntryModule {}
