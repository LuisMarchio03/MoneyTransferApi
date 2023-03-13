import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import AWS from 'aws-sdk'

type IUserDTO = {
  name: string
  username: string
}

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  // const { name, username } = JSON.parse(event.body!) as IUserDTO

  return {
    statusCode: 200,
    body: JSON.stringify("Hello World"),
  }
}
