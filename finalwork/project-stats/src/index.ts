import amqp = require('amqplib/callback_api');

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
        const queue = 'hello';
        channel.assertQueue(queue, { durable: false});
        console.log('Waiting for messages', queue);
        channel.consume(queue, function(message) {
            if(message){
                console.log('Message received: ' + message.content.toString());
            }
        }, {
            noAck: true
        })
    });
})