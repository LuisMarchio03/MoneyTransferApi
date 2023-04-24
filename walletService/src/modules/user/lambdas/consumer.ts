import { APIGatewayProxyEvent } from "aws-lambda";
import { Consumer } from "../providers/update-user.consumer";
import { RabbitMQConnection } from "../../shared/providers/amqp";

export const handler = async(event: APIGatewayProxyEvent) => {
  try {
    const consumer = new Consumer(new RabbitMQConnection());
    await consumer.execute();
 
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