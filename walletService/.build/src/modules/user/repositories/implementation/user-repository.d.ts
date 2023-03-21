import { UserEntity } from '../../entities/user.entity';
import { UserRepositoryInterface } from '../user-repository-interface';
export declare class UserRepository implements UserRepositoryInterface {
    save(user: UserEntity): Promise<void>;
    findEmail(email: string): Promise<UserEntity | null>;
    findCpfCnpj(cpfCnpj: string): Promise<UserEntity | null>;
    findWalletByUserId(id: string): Promise<UserEntity | null>;
}
//# sourceMappingURL=user-repository.d.ts.map