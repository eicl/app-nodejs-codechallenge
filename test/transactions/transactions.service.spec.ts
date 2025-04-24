// test/transactions.service.spec.ts
import { TransactionsService } from '../../src/transactions/transactions.service';
import { KafkaService } from '../../src/kafka/kafka.service';

describe('TransactionsService', () => {
  let service: TransactionsService;

  const mockKafkaService = {
    send: jest.fn().mockResolvedValue({}),
  };

  beforeEach(() => {
    service = new TransactionsService(mockKafkaService as unknown as KafkaService); 
  });

  it('debería rechazar transacciones mayores a 1000', async () => {
    const transaction = {
        accountExternalIdDebit: "uuid-debit",
        accountExternalIdCredit: "uuid-credit",
        tranferTypeId: 1,
        value: 1500
      };
    const result = await service.createTransaction(transaction);
    expect(result.transactionStatus.name).toBe('pending');
    expect(mockKafkaService.send).toHaveBeenCalledTimes(1);
  });
});