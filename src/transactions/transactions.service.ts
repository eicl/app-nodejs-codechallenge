import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Transaction } from './models/transaction.model';
import { CreateTransactionInput } from './dto/create-transaction.input';
import { KafkaService } from '../kafka/kafka.service';

const prisma = new PrismaClient();

@Injectable()
export class TransactionsService {
  constructor(private kafkaService: KafkaService) {}

  async createTransaction(dto: CreateTransactionInput) : Promise<Transaction> {
    const transaction = await prisma.transaction.create({
      data: {
        accountExternalIdDebit: dto.accountExternalIdDebit,
        accountExternalIdCredit: dto.accountExternalIdCredit,
        tranferTypeId: dto.tranferTypeId,
        value: dto.value,
        status: 'pending',
      },
    });

    await this.kafkaService.send('validate_transaction', transaction);
    return  {
      transactionExternalId: transaction.transactionExternalId,
      transactionType: { name: 'transfer' }, 
      transactionStatus: { name: transaction.status },
      value: transaction.value,
      createdAt: transaction.createdAt
    };
  }

  async findOne(transactionExternalId: string): Promise<Transaction> {
    const transaction = await prisma.transaction.findUnique({ where: { transactionExternalId } });
    if (!transaction) {
      throw new Error('Transaction not found');
    }
    return {
      transactionExternalId: transaction?.transactionExternalId! ,
      transactionStatus: { name: transaction?.status! },
      transactionType: { name: 'transfer' },
      value: transaction?.value!,
      createdAt: transaction?.createdAt!,
    };
  }
}

