import { ObjectType, Field, Float } from '@nestjs/graphql';
import { TransactionStatus } from './transaction-status.model';
import { TransactionType } from './transaction-type.model';

@ObjectType()
export class Transaction {
  @Field({ name: 'transactionExternalId' })
  transactionExternalId: string;

  @Field(() => TransactionType)
  transactionType: TransactionType;

  @Field(() => TransactionStatus)
  transactionStatus: TransactionStatus;

  @Field(() => Float)
  value: number;

  @Field({ name: 'createdAt' })
  createdAt: Date;
}