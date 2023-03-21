import { User } from '../../entities/user.interface';

export type HttpResponseInterface = {
  message?: string;
  user?: Partial<User>;
  body?: string;
}