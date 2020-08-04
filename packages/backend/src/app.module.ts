import { join } from 'path';

import { HttpModule, Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ServeStaticModule } from '@nestjs/serve-static';

import { EntryModule } from './entry/entry.module';

@Module({
  imports: [
    HttpModule.register({
      baseURL: 'https://fantasy.premierleague.com/api',
    }),
    ServeStaticModule.forRoot({
      rootPath: join(
        __dirname,
        '..',
        '..',
        '..',
        '..',
        'packages',
        'frontend',
        'dist',
        'fpldata',
      ),
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.graphql'),
      typePaths: ['./**/*.graphql'],
      definitions: {
        path: join(process.cwd(), '../frontend/src/app/core/api/api.types.ts'),
      },
      debug: true,
      playground: true,
    }),
    EntryModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
