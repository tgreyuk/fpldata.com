import { Module } from '@nestjs/common';

import { ApiService } from '../api/api.service';
import { EntryResolver } from './entry.resolver';

@Module({
  imports: [],
  providers: [ApiService, EntryResolver],
})
export class EntryModule {}
