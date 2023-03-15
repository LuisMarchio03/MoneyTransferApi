import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { CreateUserUseCase } from '../usecases/create-user.usecase';
import { UserRepository } from '../repositories/implementation/user-repository';
import { UserEntity } from '../entities/user.entity';

// class MinhaLambdaFunction {
//   private nome: string;

//   constructor() {
//     this.nome = "MinhaLambdaFunction";
//   }

//   run(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
//     return Promise.resolve({
//       statusCode: 200,
//       body: JSON.stringify("Hello World"),
//     });
//   }
// }

// export const handler = async(event: APIGatewayProxyEvent) => {
//   const minhaLambdaFunction = new MinhaLambdaFunction();
//   return await minhaLambdaFunction.run(event);
// }

type CreateUserUseCaseRequest = {
  name: string;
  email: string;
  password: string;
  balance: number;
  cpfCnpj: string;
  type: 'common' | 'shopkeeper';
  createdAt: Date;
}

class CreateUserLambda {
  async run(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
    try {
      console.log("teste");
      const { 
        name,
        email,
        password,
        balance,
        cpfCnpj,
        type,
      }: CreateUserUseCaseRequest  = JSON.parse(event.body!);

      const repository = new UserRepository();
      const usecase = new CreateUserUseCase(repository);

      await usecase.execute({
        name,
        email,
        password,
        balance,
        cpfCnpj,
        type,
        createdAt: new Date(),
      });

      return Promise.resolve({
        statusCode: 200,
        body: JSON.stringify({
          message: "User created successfully",
        }),
      });
    } catch (err) {
      console.log("Erro: ", err);
      return Promise.resolve({
        statusCode: 400,
        body: JSON.stringify(err),
      });
    }
  }
}

export const handler = async(event: APIGatewayProxyEvent) => {
  const lambdaFunction = new CreateUserLambda();
  return await lambdaFunction.run(event);
}