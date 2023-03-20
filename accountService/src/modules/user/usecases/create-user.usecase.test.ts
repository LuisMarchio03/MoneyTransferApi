import { describe, it, expect, beforeAll } from 'vitest';
import { UserEntity } from '../entities/user.entity';
import { InMemoryUserRepository } from '../repositories/in-memory/in-memory-user-repository';
import { UserRepositoryInterface } from '../repositories/user-repository-interface';
import { CreateUserUseCase } from './create-user.usecase';

let sut: CreateUserUseCase
let repository: UserRepositoryInterface 

describe('CreateUserUseCase', () => {
  beforeAll(() => {
    repository = new InMemoryUserRepository()
    sut = new CreateUserUseCase(repository);
  })

  it('should create a new user', async () => {
    const user = await sut.execute({
      name: 'John Doe',
      email: 'john@email.com',
      password: '123456',
      balance: 0,
      cpfCnpj: '12345678910',
      type: 'common',
    })
    
    expect(sut).toBeInstanceOf(CreateUserUseCase);
    expect(sut).toHaveProperty('execute');  
    expect(user).toBeInstanceOf(UserEntity);
    expect(user).toHaveProperty('id');
  })

  it('should not create a new user when user already exists', async () => {
    await sut.execute({
      name: 'John2 Doe',
      email: 'john2@gmail.com',
      balance: 0,
      cpfCnpj: '22233322265',
      type: 'common',
      password: '123456',
    })

    expect(sut.execute({
      name: 'John3 Doe',
      email: 'john2@gmail.com',
      balance: 100,
      cpfCnpj: '22266622265',
      type: 'common',
      password: '123456',
     })).rejects.toThrowError('User already exists')

    expect(sut.execute({
      name: 'John5 Doe',
      email: 'john5@email.com',
      password: '123456',
      balance: 0,
      cpfCnpj: '22233322265',
      type: 'common',
    })).rejects.toBeInstanceOf(Error)
  })
})