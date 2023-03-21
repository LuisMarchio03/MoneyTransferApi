import { RabbitMQConnection } from "../../shared/providers/amqp";

export class SendMessage {
  constructor(
    private rabbitMQConnection: RabbitMQConnection,
    private exchangeName = 'amq.direct',
    private exchangeType = 'direct',
  ) {}

  async execute(message: string): Promise<void> {
    try {
      await this.rabbitMQConnection.connect();
      const channel = await this.rabbitMQConnection.createChannel()  
      await channel.assertExchange(this.exchangeName, this.exchangeType);
      channel.publish(this.exchangeName, '', Buffer.from(message)); 
      // await channel.assertQueue(queueName);
      // channel.sendToQueue(queueName, Buffer.from(message));
    } catch (err) {
      throw new Error('Error sending message to RabbitMQ');   
    }
  }
}