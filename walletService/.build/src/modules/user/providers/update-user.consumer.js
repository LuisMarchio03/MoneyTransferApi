"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Consumer = void 0;
const prisma_1 = require("../../shared/db/prisma");
class Consumer {
    rabbitMQConnection;
    queueName;
    constructor(rabbitMQConnection, queueName = 'transfer') {
        this.rabbitMQConnection = rabbitMQConnection;
        this.queueName = queueName;
    }
    async execute() {
        try {
            await this.rabbitMQConnection.connect();
            const channel = await this.rabbitMQConnection.createChannel();
            await channel.assertQueue(this.queueName);
            channel.consume(this.queueName, async (msg) => {
                console.log(msg?.content.toString());
                const { payer: Payer, payee: Payee, value: Value, type: Type, } = JSON.parse(msg?.content.toString() || '{}');
                if (!Payer || !Payee || !Value || !Type) {
                    throw new Error('Invalid message');
                }
                const result = {
                    Payer,
                    Payee,
                    Value,
                    Type,
                };
                console.log("result", result);
                if (!result) {
                    throw new Error('Invalid message');
                }
                if (result.Type === "transfer") {
                    console.log("Transfer");
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
                }
                else if (result.Type === "cancel") {
                    console.log("Cancel");
                    await prisma_1.prisma.user.update({
                        where: {
                            id: result.Payer,
                        },
                        data: {
                            balance: {
                                increment: result.Value,
                            },
                        },
                    });
                    await prisma_1.prisma.user.update({
                        where: {
                            id: result.Payee,
                        },
                        data: {
                            balance: {
                                decrement: result.Value,
                            },
                        },
                    });
                }
                channel.ack(msg);
            });
        }
        catch (err) {
            throw new Error('Error consumer message to RabbitMQ');
        }
    }
}
exports.Consumer = Consumer;
//# sourceMappingURL=update-user.consumer.js.map