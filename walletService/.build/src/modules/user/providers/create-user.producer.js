"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendMessage = void 0;
class SendMessage {
    rabbitMQConnection;
    exchangeName;
    exchangeType;
    constructor(rabbitMQConnection, exchangeName = 'amq.direct', exchangeType = 'direct') {
        this.rabbitMQConnection = rabbitMQConnection;
        this.exchangeName = exchangeName;
        this.exchangeType = exchangeType;
    }
    async execute(message) {
        try {
            await this.rabbitMQConnection.connect();
            const channel = await this.rabbitMQConnection.createChannel();
            await channel.assertExchange(this.exchangeName, this.exchangeType);
            channel.publish(this.exchangeName, '', Buffer.from(message));
        }
        catch (err) {
            throw new Error('Error sending message to RabbitMQ');
        }
    }
}
exports.SendMessage = SendMessage;
//# sourceMappingURL=create-user.producer.js.map