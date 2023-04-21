import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { CreateUserUseCase } from '../usecases/create-user.usecase';
import { UserRepository } from '../repositories/implementation/user-repository';
import { SendMessage } from '../providers/create-user.producer';
import { RabbitMQConnection } from '../../shared/providers/amqp';
import { HttpRequestInterface } from '../protocols/http/httpRequest.interface';
import { httpResponse } from '../helpers/http/httpResponse';
import { badRequest } from '../helpers/http/badRequest';

export class CreateUserLambda {
  constructor(
    private readonly usecase: CreateUserUseCase,
    private readonly producer: SendMessage
  ) {}

  async run(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
    try {
      const { 
        name,
        email,
        password,
        balance,
        cpfCnpj,
        type,
      }: HttpRequestInterface  = JSON.parse(event.body!);

      const user = await this.usecase.execute({
        name,
        email,
        password,
        balance,
        cpfCnpj,
        type,
      });
      const id = user.id;
      await this.producer.execute(JSON.stringify({
        id,
        name,
        email,
        balance,
        cpfCnpj,
        type,
      }));

      return httpResponse({ message: "User created successfully", user })
    } catch (err) {
      return badRequest(err)
    }
  }
}

export const handler = async(event: APIGatewayProxyEvent) => {
  const repository = new UserRepository();
  const usecase = new CreateUserUseCase(repository);
  const producer = new SendMessage(new RabbitMQConnection());

  const lambdaFunction = new CreateUserLambda(usecase, producer);
  return await lambdaFunction.run(event);
}