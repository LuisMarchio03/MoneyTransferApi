import * as amqp from 'amqplib';

export class RabbitMQConnection {
  private connection: amqp.Connection | null;
  
  constructor() {
    this.connection = null;
  }
  
  async connect(): Promise<void> {
    try {
      this.connection = await amqp.connect("amqp://guest:guest@localhost:5672/");
    } catch (error) {
      throw new Error('Error connecting to RabbitMQ');
    }
  }
  
  async createChannel(): Promise<amqp.Channel> {
    if (!this.connection) {
      throw new Error('Not connected to RabbitMQ');
    }
    
    try {
      const channel = await this.connection.createChannel();
      return channel;
    } catch (error) {
      throw new Error('Error creating channel');
    }
  }
  
  async close(): Promise<void> {
    if (this.connection) {
      await this.connection.close();
      this.connection = null;
    }
  }
}