import { describe, expect, it, vi, beforeEach } from 'vitest';
import { GetWalletLambda } from './get-wallet';

let event: any;
let usecase: any;

describe('GetWalletLambda', () => {
  beforeEach(() => {
    event = {
      pathParameters: {
        id: '123',
      },
    };

    usecase = {
      execute: vi.fn().mockResolvedValue(event.pathParameters.id),
    };
  })

  it('should return a user', async () => {
    const lambdaFunction = new GetWalletLambda(usecase);
    const result = await lambdaFunction.run(event);

    expect(result.statusCode).toEqual(200);
  })

  it('should return a bad request', async () => {
    event.pathParameters.id = undefined;

    const lambdaFunction = new GetWalletLambda(usecase);
    const result = await lambdaFunction.run(event);

    expect(result.statusCode).toEqual(400);
  })
});
