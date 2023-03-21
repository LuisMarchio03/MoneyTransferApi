"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const prisma_1 = require("../../../shared/db/prisma");
const user_entity_1 = require("../../entities/user.entity");
class UserRepository {
    async save(user) {
        await prisma_1.prisma.user.create({
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
        });
    }
    async findEmail(email) {
        const result = await prisma_1.prisma.user.findFirst({
            where: {
                email
            }
        });
        if (!result) {
            return null;
        }
        const user = new user_entity_1.UserEntity({
            id: result.id,
            name: result.name,
            email: result.email,
            cpfCnpj: result.cpfCnpj,
            password: result.password,
            type: result.type,
            balance: result.balance,
            createdAt: result.createdAt,
            updatedAt: result.updatedAt,
            deletedAt: result.deletedAt,
        });
        return user;
    }
    async findCpfCnpj(cpfCnpj) {
        const result = await prisma_1.prisma.user.findFirst({
            where: {
                cpfCnpj
            }
        });
        if (!result) {
            return null;
        }
        const user = new user_entity_1.UserEntity({
            id: result.id,
            name: result.name,
            email: result.email,
            cpfCnpj: result.cpfCnpj,
            password: result.password,
            type: result.type,
            balance: result.balance,
            createdAt: result.createdAt,
            updatedAt: result.updatedAt,
            deletedAt: result.deletedAt,
        });
        return user;
    }
    async findWalletByUserId(id) {
        const walletUser = await prisma_1.prisma.user.findFirst({
            where: {
                id
            }
        });
        if (!walletUser) {
            return null;
        }
        const user = new user_entity_1.UserEntity({
            id: walletUser.id,
            name: walletUser.name,
            email: walletUser.email,
            cpfCnpj: walletUser.cpfCnpj,
            password: walletUser.password,
            balance: walletUser.balance,
            type: walletUser.type,
            createdAt: walletUser.createdAt,
            deletedAt: walletUser.deletedAt,
            updatedAt: walletUser.updatedAt,
        });
        return user;
    }
}
exports.UserRepository = UserRepository;
//# sourceMappingURL=user-repository.js.map