import {injectable} from "inversify";
import amqp = require('amqplib/callback_api');

@injectable()
export class SenderService {
    sendMessage(){
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

                const queue = 'hello';
                const message = 'Hello world!';

                channel.assertQueue(queue, { durable: false });
                channel.sendToQueue(queue, Buffer.from(message));
                console.log('message: ' + message);
            });

            setTimeout(function() {
                connection.close();
                process.exit(0);
            }, 500);
        })
    }
}