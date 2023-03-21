import * as amqp from 'amqplib';
export declare class RabbitMQConnection {
    private connection;
    constructor();
    connect(): Promise<void>;
    createChannel(): Promise<amqp.Channel>;
    close(): Promise<void>;
}
//# sourceMappingURL=amqp.d.ts.map