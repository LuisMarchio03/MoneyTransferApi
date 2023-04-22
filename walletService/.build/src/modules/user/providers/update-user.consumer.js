"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Consumer = void 0;
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
                const { Payer, Payee, Value, } = JSON.parse(msg?.content.toString() || '{}');
                if (!Payer || !Payee || !Value) {
                    throw new Error('Invalid message');
                }
                const result = {
                    Payer,
                    Payee,
                    Value,
                };
                channel.ack(msg);
                return result;
            });
        }
        catch (err) {
            throw new Error('Error consumer message to RabbitMQ');
        }
    }
}
exports.Consumer = Consumer;
//# sourceMappingURL=update-user.consumer.js.map