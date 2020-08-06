import { Module } from '@nestjs/common';

import { ApiService } from './api.service';

@Module({
  imports: [],
  providers: [ApiService],
})
export class ApiModule {}
