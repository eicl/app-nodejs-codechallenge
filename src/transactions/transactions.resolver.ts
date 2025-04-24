import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { TransactionsService } from './transactions.service';
import { Transaction } from './models/transaction.model';
import { CreateTransactionInput } from './dto/create-transaction.input';

@Resolver()
export class TransactionsResolver {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Query(() => Transaction)
  transaction(@Args('transactionExternalId') transactionExternalId: string) : Promise<Transaction>{
    return this.transactionsService.findOne(transactionExternalId);
  }

  @Mutation(() => Transaction)
  async createTransaction(
    @Args('input') input: CreateTransactionInput,
  ): Promise<Transaction> {
    return this.transactionsService.createTransaction(input);
  }
}
