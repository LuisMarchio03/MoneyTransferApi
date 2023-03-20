import { User } from '../../entities/user.interface';

export type HttpResponseInterface = {
  message?: string;
  user?: User;
  body?: string;
}