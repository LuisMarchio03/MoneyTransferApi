import { CreateUserDTO } from '../dtos/createUserDTO';
import { UserEntity } from '../entities/user.entity';
import { UserRepositoryInterface } from '../repositories/user-repository-interface';
type CreateUserUseCaseResponse = UserEntity;
export declare class CreateUserUseCase {
    private repository;
    constructor(repository: UserRepositoryInterface);
    execute(request: CreateUserDTO): Promise<CreateUserUseCaseResponse>;
}
export {};
//# sourceMappingURL=create-user.usecase.d.ts.map