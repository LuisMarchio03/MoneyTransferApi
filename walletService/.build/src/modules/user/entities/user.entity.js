"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserEntity = void 0;
class UserEntity {
    props;
    get id() {
        return this.props.id;
    }
    get name() {
        return this.props.name;
    }
    get email() {
        return this.props.email;
    }
    get password() {
        return this.props.password;
    }
    get balance() {
        return this.props.balance;
    }
    get cpfCnpj() {
        return this.props.cpfCnpj;
    }
    get type() {
        return this.props.type;
    }
    get createdAt() {
        return this.props.createdAt;
    }
    get updatedAt() {
        return this.props.updatedAt;
    }
    get deletedAt() {
        return this.props.deletedAt;
    }
    static isValid(props) {
        if (!props.id || typeof props.id !== 'string') {
            throw new Error('Invalid ID');
        }
        if (!props.name || props.name.length < 3) {
            throw new Error('Invalid name');
        }
        if (!props.email || props.email.length < 3 || !props.email.includes('@')) {
            throw new Error('Invalid email');
        }
        if (props.balance < 0) {
            throw new Error('Invalid balance');
        }
        if (!props.cpfCnpj || props.cpfCnpj.length < 11) {
            throw new Error('Invalid CPF/CNPJ');
        }
        if (!props.password || props.password.length < 3) {
            throw new Error('Invalid password');
        }
        if (!props.type || (props.type !== 'common' && props.type !== 'shopkeeper')) {
            throw new Error('Invalid type');
        }
        if (!props.createdAt) {
            throw new Error('Invalid created at');
        }
        if (props.updatedAt && props.updatedAt < props.createdAt) {
            throw new Error('Invalid updated at');
        }
        if (props.deletedAt && props.deletedAt < props.createdAt) {
            throw new Error('Invalid deleted at');
        }
    }
    constructor(props) {
        UserEntity.isValid(props);
        this.props = props;
    }
}
exports.UserEntity = UserEntity;
//# sourceMappingURL=user.entity.js.map