import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Summary {
  name: string;
  region: string;
  flagIso: string;
  overallPoints: number;
  overallRank: number;
}
