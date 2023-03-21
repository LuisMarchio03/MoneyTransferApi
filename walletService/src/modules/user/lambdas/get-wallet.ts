import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { badRequest } from "../helpers/http/badRequest";
import { httpResponse } from "../helpers/http/httpResponse";
import { UserRepository } from "../repositories/implementation/user-repository";
import { GetWalletUseCase } from "../usecases/get-wallet.usecase";

export class GetWalletLambda {
  constructor(
    private readonly usecase: GetWalletUseCase,
  ) {}

  async run(
    event: APIGatewayProxyEvent
  ): Promise<APIGatewayProxyResult> {
    try {
      const { id } = event.pathParameters!;
      if (!id) {
        throw new Error("Id is required");
      }
      const user = await this.usecase.execute(id);

      return httpResponse({ user: {
        id: user.id,
        name: user.name,
        email: user.email,
        cpfCnpj: user.cpfCnpj,
        type: user.type as "common" | "shopkeeper",
        balance: user.balance,
        createdAt: user.createdAt,
      } })
    } catch (err) {
      console.log(err);
      return badRequest(err)
    }
  }
}

export const handler = async(event: APIGatewayProxyEvent) => {
  const repository = new UserRepository();
  const usecase = new GetWalletUseCase(repository);

  const lambdaFunction = new GetWalletLambda(usecase);
  return await lambdaFunction.run(event);
}