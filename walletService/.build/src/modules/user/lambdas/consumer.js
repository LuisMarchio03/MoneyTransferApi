"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const update_user_consumer_1 = require("../providers/update-user.consumer");
const amqp_1 = require("../../shared/providers/amqp");
const prisma_1 = require("../../shared/db/prisma");
const handler = async (event) => {
    try {
        const consumer = new update_user_consumer_1.Consumer(new amqp_1.RabbitMQConnection());
        const result = await consumer.execute();
        await prisma_1.prisma.user.update({
            where: {
                id: result.Payer,
            },
            data: {
                balance: {
                    decrement: result.Value,
                },
            },
        });
        await prisma_1.prisma.user.update({
            where: {
                id: result.Payee,
            },
            data: {
                balance: {
                    increment: result.Value,
                },
            },
        });
        return {
            statusCode: 200,
            body: JSON.stringify({
                message: 'User updated',
            }),
        };
    }
    catch (err) {
        return {
            statusCode: 400,
            body: JSON.stringify({
                message: err.message || 'Unexpected error',
            }),
        };
    }
};
exports.handler = handler;
//# sourceMappingURL=consumer.js.map