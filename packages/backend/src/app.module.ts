import { join } from 'path';

import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

import { EntryModule } from './graphql/entry/entry.module';

console.log(join(process.cwd(), '../fpldata-frontend/src/app/graphql.ts'));
@Module({
  imports: [
    EntryModule,
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/graphql/schema.graphql'),
      typePaths: ['./**/*.graphql'],
      definitions: {
        path: join(
          process.cwd(),
          '../frontend/src/app/core/data.service.types.ts',
        ),
      },
      debug: true,
      playground: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
