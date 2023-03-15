import { UserEntity } from '../entities/user.entity';
import { UserRepositoryInterface } from '../repositories/user-repository-interface';

type CreateUserUseCaseRequest = {
  name: string;
  email: string;
  password: string;
  balance: number;
  cpfCnpj: string;
  type: 'common' | 'shopkeeper';
  createdAt: Date;
}

type CreateUserUseCaseResponse = UserEntity;

export class CreateUserUseCase {
  constructor(
    private repository: UserRepositoryInterface
  ) {}

  async execute(
    request: CreateUserUseCaseRequest
  ): Promise<CreateUserUseCaseResponse> {
    const { 
      name,
      email,
      password,
      balance,
      cpfCnpj,
      type,
      createdAt,
    } = request;

    let userAlreadyExists = await this.repository.findEmail(email)

    if (userAlreadyExists) {
      throw new Error('User already exists')
    }

    userAlreadyExists = await this.repository.findCpfCnpj(cpfCnpj)

    if (userAlreadyExists) {
      throw new Error('User already exists')
    }

    const user = new UserEntity({
      id: new Date().getTime() + Math.random(),
      name,
      email,
      password,
      balance,
      cpfCnpj,
      type,
      createdAt,
      updatedAt: null,
      deletedAt: null,
    });

    await this.repository.save(user)

    return user;
  }
}
