"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserUseCase = void 0;
const user_entity_1 = require("../entities/user.entity");
class CreateUserUseCase {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    async execute(request) {
        const { name, email, password, balance, cpfCnpj, type, } = request;
        let userAlreadyExists = await this.repository.findEmail(email);
        if (userAlreadyExists) {
            throw new Error('User already exists');
        }
        userAlreadyExists = await this.repository.findCpfCnpj(cpfCnpj);
        if (userAlreadyExists) {
            throw new Error('User already exists');
        }
        const user = new user_entity_1.UserEntity({
            id: String(Math.random() *
                Date.now()),
            name,
            email,
            password,
            balance,
            cpfCnpj,
            type,
            createdAt: new Date(),
            updatedAt: null,
            deletedAt: null,
        });
        await this.repository.save(user);
        return user;
    }
}
exports.CreateUserUseCase = CreateUserUseCase;
//# sourceMappingURL=create-user.usecase.js.map