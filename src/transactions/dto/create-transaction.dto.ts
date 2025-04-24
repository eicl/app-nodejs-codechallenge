import { IsUUID, IsNumber, IsInt, IsOptional, IsString } from 'class-validator';

export class CreateTransactionDto {
  @IsUUID()
  accountExternalIdDebit: string;

  @IsUUID()
  accountExternalIdCredit: string;

  @IsInt()
  tranferTypeId: number;

  @IsNumber()
  value: number;

  @IsOptional()
  @IsString()
  transactionExternalId?: string;
}
