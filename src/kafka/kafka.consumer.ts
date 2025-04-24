import { OnModuleInit } from '@nestjs/common';
import { Kafka } from 'kafkajs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class KafkaConsumer implements OnModuleInit {
  async onModuleInit() {
    const kafka = new Kafka({ brokers: ['localhost:9092'] });
    const consumer = kafka.consumer({ groupId: 'transaction-update-group' });

    await consumer.connect();
    await consumer.subscribe({ topic: 'update_transaction_status', fromBeginning: true });

    await consumer.run({
      eachMessage: async ({ message }) => {
        const data = JSON.parse((message.value+ '').toString());
        await prisma.transaction.update({
          where: { transactionExternalId: data.transactionExternalId },
          data: { status: data.status },
        });
        console.log(`Transacción ${data.id} actualizada a ${data.status}`);
      },
    });
  }
}
