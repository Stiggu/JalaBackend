const amqp = require('amqplib');
import {Communication} from "../Core/communication";
import {Channel} from "amqplib";

export class SenderService {
    private static instance: SenderService;
    private channel!: Channel;
    private queueName: string = 'notifications';

    constructor() {
    }

    public static async getInstance(): Promise<SenderService> {
        if (!SenderService.instance) {
            SenderService.instance = new SenderService();
            SenderService.instance = await SenderService.instance.init();
        }
        return SenderService.instance;
    }

    private async init() {
        const connection = await amqp.connect({
            hostname: 'localhost',
            port: 8080,
            username: 'admin',
            password: 'root'
        });

        this.channel = await connection.createChannel();

        return this;
    }

    async sendMessage(message: Communication) {
        await this.channel.assertQueue(this.queueName, {durable: false});
        this.channel.sendToQueue(this.queueName, Buffer.from(JSON.stringify(message)));
    }
}