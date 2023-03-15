"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserEntity = void 0;
var UserEntity = /** @class */ (function () {
    function UserEntity(props) {
        UserEntity.isValid(props);
        this.props = props;
    }
    Object.defineProperty(UserEntity.prototype, "id", {
        get: function () {
            return this.props.id;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UserEntity.prototype, "name", {
        get: function () {
            return this.props.name;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UserEntity.prototype, "email", {
        get: function () {
            return this.props.email;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UserEntity.prototype, "password", {
        get: function () {
            return this.props.password;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UserEntity.prototype, "balance", {
        get: function () {
            return this.props.balance;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UserEntity.prototype, "cpfCnpj", {
        get: function () {
            return this.props.cpfCnpj;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UserEntity.prototype, "type", {
        get: function () {
            return this.props.type;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UserEntity.prototype, "createdAt", {
        get: function () {
            return this.props.createdAt;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UserEntity.prototype, "updatedAt", {
        get: function () {
            return this.props.updatedAt;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UserEntity.prototype, "deletedAt", {
        get: function () {
            return this.props.deletedAt;
        },
        enumerable: false,
        configurable: true
    });
    UserEntity.isValid = function (props) {
        if (!props.id || props.id < 0) {
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
    };
    return UserEntity;
}());
exports.UserEntity = UserEntity;
//# sourceMappingURL=user.entity.js.map