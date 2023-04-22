import { APIGatewayProxyEvent } from "aws-lambda";
import { Consumer } from "../providers/update-user.consumer";
import { RabbitMQConnection } from "../../shared/providers/amqp";
import { prisma } from "../../shared/db/prisma";

export const handler = async(event: APIGatewayProxyEvent) => {
  try {
    const consumer = new Consumer(new RabbitMQConnection());
    const result = await consumer.execute();

    if (result.Type === "transfer") {
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
 

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'User updated',
      }),
    };
  } catch (err: any) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: err.message || 'Unexpected error',
      }),
    };
  }  
}