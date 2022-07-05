import amqp = require('amqplib/callback_api');
import {AttendanceService, AttendanceCommunication} from "./attendanceService";
import {UserCommunication, UserService} from "./userService";

export enum CommunicationType {
    ATTENDANCE = 0,
    USER = 1,
}

amqp.connect({
    hostname: 'localhost',
    port: 8080,
    username: 'admin',
    password: 'root'
}, function(error, connection) {
    if(error){
        console.log(error);
    }

    connection.createChannel(function(error1, channel) {
        if(error1) {
            console.log(error1);
        }
        const queue = 'notifications';
        channel.assertQueue(queue, { durable: false});
        console.log('Waiting for messages in queue: ', queue);
        channel.consume(queue, async function (message) {
            if (message) {
                const parsedMessage = JSON.parse(message.content.toString());
                if (parsedMessage.type === CommunicationType.ATTENDANCE) {
                    const communication: AttendanceCommunication = {
                        message: parsedMessage.message, 
                        type: parsedMessage.type
                    }
                    await AttendanceService.handleMessage(communication);
                } else {
                    const communication: UserCommunication = {
                        message: parsedMessage.message,
                        type: parsedMessage.type
                    }
                    await UserService.handleMessage(communication);
                }
            }
        }, {
            noAck: true
        })
    });
})