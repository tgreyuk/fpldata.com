import { HttpModule, Module } from '@nestjs/common';

import { ApiService } from './api.service';

@Module({
  imports: [
    HttpModule.register({
      baseURL: 'https://fantasy.premierleague.com/api',
    }),
  ],
  providers: [ApiService],
})
export class ApiModule {}
