import { UserEntity } from '../../entities/user.entity';
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { UserRepository } from './user-repository';
import { prisma } from '../../../shared/db/prisma';

describe('User Repository', () => {
  let userRepository: UserRepository;
  let user: UserEntity;

  beforeAll(() => {
    userRepository = new UserRepository();

    user = new UserEntity({
      id: "1",
      name: 'John Doe',
      email: 'john@email.com',
      password: '123456',
      balance: 0,
      cpfCnpj: '12345678910',
      type: 'common',
      createdAt: new Date(),
      updatedAt: null,
      deletedAt: null,
    })
  });

  afterAll(async () => {
    await prisma.user.deleteMany()
    await prisma.$disconnect()
  });


  it('should be able to save a new user in database', async () => {
    expect(userRepository).toBeInstanceOf(UserRepository);
    expect(userRepository).toHaveProperty('save');
    expect(await userRepository.save(user)).toBe(undefined)
  })

  it('should be able to find a user by email', async () => {
    const res = await userRepository.findEmail(user.email)
    expect(userRepository).toBeInstanceOf(UserRepository);
    expect(userRepository).toHaveProperty('findEmail');
    expect(res?.id).toBe(user.id)
  })

  it('should be able to find a user by cpfCnpj', async () => {
    const res = await userRepository.findCpfCnpj(user.cpfCnpj)
    expect(userRepository).toBeInstanceOf(UserRepository);
    expect(userRepository).toHaveProperty('findCpfCnpj');
    expect(res?.id).toBe(user.id)
  })

  it('should be able to find a wallet user by userId', async () => {
    const res = await userRepository.findWalletByUserId(user.id)
    expect(userRepository).toBeInstanceOf(UserRepository);
    expect(userRepository).toHaveProperty('findWalletByUserId');
    expect(res?.id).toBe(user.id)
  })

  it('should not be able to find a user by email', async () => {
    const res = await userRepository.findEmail('luis@mail.com')
    expect(res).toBe(null)
  })

  it('should not be able to find a user by cpfCnpj', async () => {
    const res = await userRepository.findCpfCnpj('12345678911')
    expect(res).toBe(null)
  })
})