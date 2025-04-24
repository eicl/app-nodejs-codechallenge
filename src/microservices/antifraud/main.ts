import { Kafka } from 'kafkajs';

const kafka = new Kafka({ brokers: ['localhost:9092'] });
const consumer = kafka.consumer({ groupId: 'antifraud-group' });
const producer = kafka.producer();

async function run() {
  await consumer.connect();
  await producer.connect();
  await consumer.subscribe({ topic: 'validate_transaction', fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ message }) => {
      const data = JSON.parse((message.value+'').toString());
      const status = data.value > 1000 ? 'rejected' : 'approved';

      await producer.send({
        topic: 'update_transaction_status',
        messages: [{ value: JSON.stringify({ id: data.id, status }) }],
      });

      console.log(`Anti-fraude procesó: ${data.id} → ${status}`);
    },
  });
}

run();
