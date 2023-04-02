"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = exports.CreateUserLambda = void 0;
const create_user_usecase_1 = require("../usecases/create-user.usecase");
const user_repository_1 = require("../repositories/implementation/user-repository");
const create_user_producer_1 = require("../providers/create-user.producer");
const amqp_1 = require("../../shared/providers/amqp");
const httpResponse_1 = require("../helpers/http/httpResponse");
const badRequest_1 = require("../helpers/http/badRequest");
class CreateUserLambda {
    usecase;
    producer;
    constructor(usecase, producer) {
        this.usecase = usecase;
        this.producer = producer;
    }
    async run(event) {
        try {
            const { name, email, password, balance, cpfCnpj, type, } = JSON.parse(event.body);
            const user = await this.usecase.execute({
                name,
                email,
                password,
                balance,
                cpfCnpj,
                type,
            });
            await this.producer.execute(JSON.stringify({
                name,
                email,
                balance,
                cpfCnpj,
                type,
            }));
            return (0, httpResponse_1.httpResponse)({ message: "User created successfully", user });
        }
        catch (err) {
            return (0, badRequest_1.badRequest)(err);
        }
    }
}
exports.CreateUserLambda = CreateUserLambda;
const handler = async (event) => {
    const repository = new user_repository_1.UserRepository();
    const usecase = new create_user_usecase_1.CreateUserUseCase(repository);
    const producer = new create_user_producer_1.SendMessage(new amqp_1.RabbitMQConnection());
    const lambdaFunction = new CreateUserLambda(usecase, producer);
    return await lambdaFunction.run(event);
};
exports.handler = handler;
//# sourceMappingURL=create-user.js.map