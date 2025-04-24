import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class TransactionType {
  @Field()
  name: string;
}