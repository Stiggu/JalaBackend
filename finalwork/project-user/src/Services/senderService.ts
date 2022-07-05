import {injectable} from "inversify";
import amqp = require('amqplib/callback_api');
import {Communication} from "../Core/communication";

@injectable()
export class SenderService {
    sendMessage(message: Communication){
        amqp.connect({
            hostname: 'localhost',
            port: 8080,
            username: 'admin',
            password: 'root'
        }, function(error: any, connection: any) {
            if(error){
                console.log(error);
            }

            connection.createChannel(function(error1:any, channel:any) {
                if(error1) {
                    console.log(error1);
                }

                const queue = 'notifications';
                channel.assertQueue(queue, { durable: false });
                channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
            });
        })
    }
}