import { HttpResponseInterface } from '../../protocols/http/httpResponse.interface';

export const httpResponse = ({message, user}: HttpResponseInterface) => Promise.resolve({
  statusCode: 200,
  body: JSON.stringify({
    message,
    user,
  }),
});