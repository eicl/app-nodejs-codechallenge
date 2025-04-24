import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';

import { TransactionsModule } from './transactions/transactions.module';
import { KafkaService } from './kafka/kafka.service';
import { KafkaConsumer } from './kafka/kafka.consumer';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground:true,
      path: '/graphql',
    }),
    TransactionsModule,
  ],
  providers: [KafkaService, KafkaConsumer],
})
export class AppModule {}
