import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { CreateUserUseCase } from '../usecases/create-user.usecase';
import { SendMessage } from '../providers/create-user.producer';
export declare class CreateUserLambda {
    private readonly usecase;
    private readonly producer;
    constructor(usecase: CreateUserUseCase, producer: SendMessage);
    run(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult>;
}
export declare const handler: (event: APIGatewayProxyEvent) => Promise<APIGatewayProxyResult>;
//# sourceMappingURL=create-user.d.ts.map