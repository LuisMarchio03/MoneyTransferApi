"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserUseCase = void 0;
var user_entity_1 = require("../entities/user.entity");
var CreateUserUseCase = /** @class */ (function () {
    function CreateUserUseCase(repository) {
        this.repository = repository;
    }
    CreateUserUseCase.prototype.execute = function (request) {
        return __awaiter(this, void 0, void 0, function () {
            var name, email, password, balance, cpfCnpj, type, createdAt, userAlreadyExists, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        name = request.name, email = request.email, password = request.password, balance = request.balance, cpfCnpj = request.cpfCnpj, type = request.type, createdAt = request.createdAt;
                        return [4 /*yield*/, this.repository.findEmail(email)];
                    case 1:
                        userAlreadyExists = _a.sent();
                        if (userAlreadyExists) {
                            throw new Error('User already exists');
                        }
                        return [4 /*yield*/, this.repository.findCpfCnpj(cpfCnpj)];
                    case 2:
                        userAlreadyExists = _a.sent();
                        if (userAlreadyExists) {
                            throw new Error('User already exists');
                        }
                        user = new user_entity_1.UserEntity({
                            id: new Date().getTime() + Math.random(),
                            name: name,
                            email: email,
                            password: password,
                            balance: balance,
                            cpfCnpj: cpfCnpj,
                            type: type,
                            createdAt: createdAt,
                            updatedAt: null,
                            deletedAt: null,
                        });
                        return [4 /*yield*/, this.repository.save(user)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, user];
                }
            });
        });
    };
    return CreateUserUseCase;
}());
exports.CreateUserUseCase = CreateUserUseCase;
//# sourceMappingURL=create-user.usecase.js.map