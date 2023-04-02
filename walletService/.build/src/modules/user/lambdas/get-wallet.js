"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = exports.GetWalletLambda = void 0;
const badRequest_1 = require("../helpers/http/badRequest");
const httpResponse_1 = require("../helpers/http/httpResponse");
const user_repository_1 = require("../repositories/implementation/user-repository");
const get_wallet_usecase_1 = require("../usecases/get-wallet.usecase");
class GetWalletLambda {
    usecase;
    constructor(usecase) {
        this.usecase = usecase;
    }
    async run(event) {
        try {
            const { id } = event.pathParameters;
            if (!id) {
                throw new Error("Id is required");
            }
            const user = await this.usecase.execute(id);
            return (0, httpResponse_1.httpResponse)({ user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    cpfCnpj: user.cpfCnpj,
                    type: user.type,
                    balance: user.balance,
                    createdAt: user.createdAt,
                } });
        }
        catch (err) {
            return (0, badRequest_1.badRequest)(err);
        }
    }
}
exports.GetWalletLambda = GetWalletLambda;
const handler = async (event) => {
    const repository = new user_repository_1.UserRepository();
    const usecase = new get_wallet_usecase_1.GetWalletUseCase(repository);
    const lambdaFunction = new GetWalletLambda(usecase);
    return await lambdaFunction.run(event);
};
exports.handler = handler;
//# sourceMappingURL=get-wallet.js.map