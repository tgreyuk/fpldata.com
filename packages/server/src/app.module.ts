import { join } from 'path';

import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ServeStaticModule } from '@nestjs/serve-static';

import { EntryModule } from './entry/entry.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(
        __dirname,
        '..',
        '..',
        '..',
        '..',
        'packages',
        'client',
        'dist',
        'fpldata',
      ),
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.graphql'),
      typePaths: ['./**/*.graphql'],
      definitions: {
        path: join(process.cwd(), '../client/src/app/core/api/api.types.ts'),
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
