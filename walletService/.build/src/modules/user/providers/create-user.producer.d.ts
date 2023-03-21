import { RabbitMQConnection } from "../../shared/providers/amqp";
export declare class SendMessage {
    private rabbitMQConnection;
    private exchangeName;
    private exchangeType;
    constructor(rabbitMQConnection: RabbitMQConnection, exchangeName?: string, exchangeType?: string);
    execute(message: string): Promise<void>;
}
//# sourceMappingURL=create-user.producer.d.ts.map