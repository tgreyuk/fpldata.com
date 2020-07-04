import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Entry {
  @Field()
  id: number;

  @Field()
  firstName: string;

  @Field()
  lastName: string;
}
