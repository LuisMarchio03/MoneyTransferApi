import { UserEntity } from "../entities/user.entity";
export type UserRepositoryInterface = {
    save(user: UserEntity): Promise<void>;
    findEmail(email: string): Promise<UserEntity | null>;
    findCpfCnpj(cpfCnpj: string): Promise<UserEntity | null>;
    findWalletByUserId(id: string): Promise<UserEntity | null>;
};
//# sourceMappingURL=user-repository-interface.d.ts.map