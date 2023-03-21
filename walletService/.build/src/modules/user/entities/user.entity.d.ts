import { User } from "./user.interface";
export declare class UserEntity {
    private props;
    get id(): string;
    get name(): string;
    get email(): string;
    get password(): string;
    get balance(): number;
    get cpfCnpj(): string;
    get type(): 'common' | 'shopkeeper';
    get createdAt(): Date;
    get updatedAt(): Date | null;
    get deletedAt(): Date | null;
    static isValid(props: User): void;
    constructor(props: User);
}
//# sourceMappingURL=user.entity.d.ts.map