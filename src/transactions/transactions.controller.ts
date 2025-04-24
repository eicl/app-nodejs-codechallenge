import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly service: TransactionsService) {}

  @Post()
  create(@Body() dto: CreateTransactionDto) {
    return this.service.createTransaction(dto);
  }

  @Get(':transactionExternalId')
  findOne(@Param('transactionExternalId') transactionExternalId: string) {
    return this.service.findOne(transactionExternalId);
  }
}

