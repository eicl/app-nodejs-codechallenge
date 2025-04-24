import { InputType, Field, Float } from '@nestjs/graphql';
import { IsUUID, IsNumber, IsString } from 'class-validator';

@InputType()
export class CreateTransactionInput {
  @Field()
  @IsUUID()
  accountExternalIdDebit: string;

  @Field()
  @IsUUID()
  accountExternalIdCredit: string;

  @Field()
  @IsNumber()
  tranferTypeId: number;

  @Field(() => Float)
  @IsNumber()
  value: number;
}
