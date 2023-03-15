import { UserEntity } from '../../entities/user.entity';
import { UserRepositoryInterface } from '../user-repository-interface'

type ISaveUser = {
  name: string;
  email: string;
  password: string;
  balance: number;
  cpfCnpj: string;
  type: 'common' | 'shopkeeper';
  createdAt: Date;
}

export class InMemoryUserRepository implements UserRepositoryInterface {
  public user: UserEntity[] = []

  async save(user: UserEntity): Promise<void> {
    this.user.push(user)
  }

  async findEmail(email: string): Promise<UserEntity | null> {
    const user = this.user.find(item => item.email === email)
    if (!user) {
      return null
    }
    return user
  }

  async findCpfCnpj(cpfCnpj: string): Promise<UserEntity | null> {
    const user = this.user.find(item => item.cpfCnpj === cpfCnpj)
    if (!user) {
      return null
    }
    return user
  }
}