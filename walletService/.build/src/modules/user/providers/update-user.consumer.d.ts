import { RabbitMQConnection } from "../../shared/providers/amqp";
export declare class Consumer {
    private rabbitMQConnection;
    private queueName;
    constructor(rabbitMQConnection: RabbitMQConnection, queueName?: string);
    execute(): Promise<void>;
}
//# sourceMappingURL=update-user.consumer.d.ts.map