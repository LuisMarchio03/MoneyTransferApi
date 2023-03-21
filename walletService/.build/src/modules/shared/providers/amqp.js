"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RabbitMQConnection = void 0;
const amqp = __importStar(require("amqplib"));
class RabbitMQConnection {
    connection;
    constructor() {
        this.connection = null;
    }
    async connect() {
        try {
            this.connection = await amqp.connect(`${process.env.RABBITMQ_URL}`);
        }
        catch (error) {
            throw new Error('Error connecting to RabbitMQ');
        }
    }
    async createChannel() {
        if (!this.connection) {
            throw new Error('Not connected to RabbitMQ');
        }
        try {
            const channel = await this.connection.createChannel();
            return channel;
        }
        catch (error) {
            throw new Error('Error creating channel');
        }
    }
    async close() {
        if (this.connection) {
            await this.connection.close();
            this.connection = null;
        }
    }
}
exports.RabbitMQConnection = RabbitMQConnection;
//# sourceMappingURL=amqp.js.map