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
export declare class GetWalletUseCase {
    private userRepository;
    constructor(userRepository: UserRepositoryInterface);
    execute(id: string): Promise<ResultsInterface>;
}
export {};
//# sourceMappingURL=get-wallet.usecase.d.ts.map