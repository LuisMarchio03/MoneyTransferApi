import { describe, it, expect, beforeAll } from 'vitest';
import { UserEntity } from '../entities/user.entity';
import { InMemoryUserRepository } from '../repositories/in-memory/in-memory-user-repository';
import { UserRepositoryInterface } from '../repositories/user-repository-interface';
import { GetWalletUseCase } from './get-wallet.usecase';

let sut: GetWalletUseCase
let repository: UserRepositoryInterface 

describe('CreateUserUseCase', () => {
  beforeAll(() => {
    repository = new InMemoryUserRepository()
    sut = new GetWalletUseCase(repository);

    const user = new UserEntity({
      id: '1',
      name: 'John Doe',
      email: 'john@mail.com',
      balance: 0,
      cpfCnpj: '12345678910',
      password: '123456',
      type: 'common',
      createdAt: new Date(),
      updatedAt: null,
      deletedAt: null,
    })

    repository.save(user)
  })

  it('should get a user wallet', async () => {
    const user = await sut.execute('1')
    
    expect(sut).toBeInstanceOf(GetWalletUseCase);
    expect(sut).toHaveProperty('execute');  
    expect(user).toBeInstanceOf(UserEntity);
    expect(user).toHaveProperty('id');
  })

  it('should not get a user wallet when user does not exists', async () => {
    expect(sut.execute('2')).rejects.toThrowError('User not found')
    expect(sut.execute('3')).rejects.toBeInstanceOf(Error)
  })

  it('should not get a user wallet when user id is null', async () => {
    expect(sut.execute(null as any)).rejects.toThrowError('Id is required')
    expect(sut.execute(null as any)).rejects.toBeInstanceOf(Error)
  })
})