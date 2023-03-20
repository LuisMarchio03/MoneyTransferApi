import { APIGatewayProxyResult } from "aws-lambda";

export const badRequest = (error: unknown): Promise<APIGatewayProxyResult> => Promise.resolve({
  statusCode: 400,
  body: JSON.stringify(error),
});