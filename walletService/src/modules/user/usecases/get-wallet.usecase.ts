import { UserEntity } from "../entities/user.entity";
import { UserRepositoryInterface } from "../repositories/user-repository-interface";

interface ResultsInterface {  
    id: string;
    name: string;
    email: string;
    cpfCnpj: string;
    type: string;
    balance: number;
    createdAt: Date;
}

export class GetWalletUseCase {
  constructor(
    private userRepository: UserRepositoryInterface,
  ) {}

  async execute(id: string): Promise<ResultsInterface> {
    if (!id) {
      throw new Error('Id is required');
    }
    const user = await this.userRepository.findWalletByUserId(id);
    if (!user) {
     throw new Error('User not found');
    }
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      cpfCnpj: user.cpfCnpj,
      type: user.type,
      balance: user.balance,
      createdAt: user.createdAt,
    };
  }
}