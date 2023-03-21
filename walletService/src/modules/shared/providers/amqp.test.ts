import { describe, it, expect } from 'vitest';
import { RabbitMQConnection } from './amqp';


describe('RabbitMQConnection', () => {
  it('should connect to RabbitMQ', async () => {
    const connection = new RabbitMQConnection();
    await connection.connect();
    expect(connection).toBeTruthy();
  });

  it('should create a channel', async () => {
    const connection = new RabbitMQConnection();
    await connection.connect();
    const channel = await connection.createChannel();
    expect(channel).toBeTruthy();
  })

  it('should close the connection', async () => {
    const connection = new RabbitMQConnection();
    await connection.connect();
    await connection.close();
    expect(connection).toBeTruthy();
  })
})
