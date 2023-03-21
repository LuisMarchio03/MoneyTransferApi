"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetWalletUseCase = void 0;
class GetWalletUseCase {
    userRepository;
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute(id) {
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
exports.GetWalletUseCase = GetWalletUseCase;
//# sourceMappingURL=get-wallet.usecase.js.map