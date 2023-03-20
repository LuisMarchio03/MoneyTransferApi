import { CreateUserDTO } from '../dtos/createUserDTO';
import { UserEntity } from '../entities/user.entity';
import { UserRepositoryInterface } from '../repositories/user-repository-interface';

type CreateUserUseCaseResponse = UserEntity;

export class CreateUserUseCase {
  constructor(
    private repository: UserRepositoryInterface,
  ) {}

  async execute(
    request: CreateUserDTO
  ): Promise<CreateUserUseCaseResponse> {
    const { 
      name,
      email,
      password,
      balance,
      cpfCnpj,
      type,
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
      id: String(
        Math.random() *
        Date.now()
      ),
      name,
      email,
      password,
      balance,
      cpfCnpj,
      type,
      createdAt: new Date(),
      updatedAt: null,
      deletedAt: null,
    });
    
    await this.repository.save(user)

    return user;
  }
}
