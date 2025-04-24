import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { KafkaService } from '../kafka/kafka.service';

const prisma = new PrismaClient();

@Injectable()
export class TransactionsService {
  constructor(private kafkaService: KafkaService) {}

  async createTransaction(dto: CreateTransactionDto) {
    const transaction = await prisma.transaction.create({
      data: { ...dto, status: 'pending' },
    });

    await this.kafkaService.send('validate_transaction', transaction);
    return transaction;
  }

  async getTransactionById(id: string) {
    return prisma.transaction.findUnique({ where: { id } });
  }
}

