import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { GetWalletUseCase } from "../usecases/get-wallet.usecase";
export declare class GetWalletLambda {
    private readonly usecase;
    constructor(usecase: GetWalletUseCase);
    run(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult>;
}
export declare const handler: (event: APIGatewayProxyEvent) => Promise<APIGatewayProxyResult>;
//# sourceMappingURL=get-wallet.d.ts.map