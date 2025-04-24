import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions/transactions.service';
import { TransactionsController } from './transactions/transactions.controller';
import { KafkaService } from './kafka/kafka.service';
import { KafkaConsumer } from './kafka/kafka.consumer';

@Module({
  imports: [],
  controllers: [TransactionsController],
  providers: [TransactionsService, KafkaService, KafkaConsumer],
})
export class AppModule {}
