import { RabbitMQConnection } from "../../shared/providers/amqp";
import { prisma } from "../../shared/db/prisma";

export class Consumer {
  constructor(
    private rabbitMQConnection: RabbitMQConnection,
    private queueName = 'transfer',
  ) {}

  async execute(): Promise<void> {
    try {
      await this.rabbitMQConnection.connect();
      const channel = await this.rabbitMQConnection.createChannel()  
      await channel.assertQueue(this.queueName);
      channel.consume(this.queueName, async (msg) => {
        console.log(msg?.content.toString());
        const {
          payer: Payer,
          payee: Payee,
          value: Value,
          type: Type,
        } = JSON.parse(msg?.content.toString() || '{}');

        if (!Payer || !Payee || !Value || !Type) {
          throw new Error('Invalid message');
        }
        
        const result = {
          Payer,
          Payee,
          Value,
          Type,
        }

        console.log("result", result)

        if (!result) {
          // return {
          //   statusCode: 400,
          //   body: JSON.stringify({
          //     message: 'Invalid message',
          //   }),
          // };
          throw new Error('Invalid message');   
        }
    
        if (result.Type === "transfer") {
          console.log("Transfer");
          await prisma.user.update({
            where: {
              id: result.Payer,
            },
            data: {
              balance: {
                decrement: result.Value,
              },
            },
          });
      
          await prisma.user.update({
            where: {
              id: result.Payee,
            },
            data: {
              balance: {
                increment: result.Value,
              },
            },
          });
        } else if (result.Type === "cancel") {
          console.log("Cancel");
          await prisma.user.update({
            where: {
              id: result.Payer,
            },
            data: {
              balance: {
                increment: result.Value,
              },
            },
          });
      
          await prisma.user.update({
            where: {
              id: result.Payee,
            },
            data: {
              balance: {
                decrement: result.Value,
              },
            },
          });
        }

        channel.ack(msg!);
      })
    } catch (err) {
      throw new Error('Error consumer message to RabbitMQ');   
    }
  }
}