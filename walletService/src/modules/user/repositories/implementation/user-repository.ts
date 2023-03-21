import { prisma } from '../../../shared/db/prisma';
import { UserEntity } from '../../entities/user.entity';
import { UserRepositoryInterface } from '../user-repository-interface'

export class UserRepository implements UserRepositoryInterface {
  async save(user: UserEntity): Promise<void> {
    await prisma.user.create({
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        cpfCnpj: user.cpfCnpj,
        password: user.password,
        type: user.type,
        balance: user.balance,
        createdAt: user.createdAt,
      }
    })
  }

  async findEmail(email: string): Promise<UserEntity | null> {
    const result = await prisma.user.findFirst({
      where: {
        email
      }
    })
    if (!result) {
      return null
    }
    const user = new UserEntity({
      id: result.id,
      name: result.name,
      email: result.email,
      cpfCnpj: result.cpfCnpj,
      password: result.password,
      type: result.type as 'common' | 'shopkeeper',
      balance: result.balance,
      createdAt: result.createdAt,
      updatedAt: result.updatedAt,
      deletedAt: result.deletedAt,
    })
    return user
  }

  async findCpfCnpj(cpfCnpj: string): Promise<UserEntity | null> {
    const result = await prisma.user.findFirst({
      where: {
        cpfCnpj
      }
    })
    if (!result) {
      return null
    }
    const user = new UserEntity({
      id: result.id,
      name: result.name,
      email: result.email,
      cpfCnpj: result.cpfCnpj,
      password: result.password,
      type: result.type as 'common' | 'shopkeeper',
      balance: result.balance,
      createdAt: result.createdAt,
      updatedAt: result.updatedAt,
      deletedAt: result.deletedAt,
    })
    return user
  }

  async findWalletByUserId(id: string): Promise<UserEntity | null> {
    const walletUser = await prisma.user.findFirst({
      where: {  
        id
      }
    })
    if (!walletUser) {
      return null
    }
    const user = new UserEntity({
      id: walletUser.id,
      name: walletUser.name,
      email: walletUser.email,
      cpfCnpj: walletUser.cpfCnpj,
      password: walletUser.password,
      balance: walletUser.balance,
      type: walletUser.type as 'common' | 'shopkeeper',
      createdAt: walletUser.createdAt,
      deletedAt: walletUser.deletedAt,
      updatedAt: walletUser.updatedAt,
    })
    return user
  }
}