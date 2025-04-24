import { Module } from '@nestjs/common';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';
import { KafkaModule } from '../kafka/kafka.module';
import { TransactionsResolver } from './transactions.resolver';

@Module({
  imports: [KafkaModule],
  controllers: [TransactionsController],
  providers: [TransactionsService,TransactionsResolver],
})
export class TransactionsModule {}
