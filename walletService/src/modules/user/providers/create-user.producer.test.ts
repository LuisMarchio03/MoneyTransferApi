import { describe, it, expect, beforeAll, vi, afterEach } from 'vitest';
import { SendMessage } from './create-user.producer';

let sut: SendMessage
let mockRabbitMQConnection: any

describe('CreateUserUseCase', () => {
  beforeAll(() => {
    mockRabbitMQConnection = {
      connect: vi.fn(),
      createChannel: vi.fn(),
    }
    sut = new SendMessage(mockRabbitMQConnection)
  })

  afterEach(() => {
    mockRabbitMQConnection.connect.mockClear()
    mockRabbitMQConnection.createChannel.mockClear()
  })

  it('should send message to RabbitMQ - users', async () => {
    const message = JSON.stringify({ 
      name: "luis13",
      email: "luis13@email.com",
      password: "123456",
      balance: 0,
      cpfCnpj: "11122233343",
      type: "shopkeeper"
    })
    const channel = {
      assertExchange: vi.fn(),
      publish: vi.fn(),
    }

    mockRabbitMQConnection.connect.mockResolvedValue()
    mockRabbitMQConnection.createChannel.mockResolvedValue(channel)

    await sut.execute(message)

    expect(mockRabbitMQConnection.connect).toBeCalledTimes(1)
    expect(mockRabbitMQConnection.createChannel).toBeCalledTimes(1)
    expect(channel.assertExchange).toBeCalledTimes(1)
    expect(channel.publish).toBeCalledTimes(1)
    expect(channel.publish).toBeCalledWith('amq.direct', '', Buffer.from(message))
    expect(channel.assertExchange).toBeCalledWith('amq.direct', 'direct')    
  })

  it('should throw error when RabbitMQ is not available', async () => {
    const message = JSON.stringify({ 
      name: "luis13",
      email: "luis13@email.com",
      password: "123456",
      balance: 0,
      cpfCnpj: "11122233343",
      type: "shopkeeper"
    })
    const channel = {
      assertExchange: vi.fn(),
      publish: vi.fn(),
    }
    
    mockRabbitMQConnection.connect.mockRejectedValue(new Error('RabbitMQ is not available'))
    mockRabbitMQConnection.createChannel.mockResolvedValue(channel)

    await expect(sut.execute(message)).rejects.toThrowError('Error sending message to RabbitMQ')

    expect(mockRabbitMQConnection.connect).toBeCalledTimes(1)
    expect(mockRabbitMQConnection.createChannel).toBeCalledTimes(0)
    expect(channel.assertExchange).toBeCalledTimes(0)
    expect(channel.publish).toBeCalledTimes(0)
  })
})
