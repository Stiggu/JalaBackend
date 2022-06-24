import amqp = require('amqplib/callback_api');

amqp.connect({
    hostname: 'localhost',
    port: 8080,
    username: 'admin',
    password: 'root'
}, function (error, connection) {
    if (error) {
        console.log(error);
    }
    connection.createChannel(function (error1, channel) {
        if (error1) {
            console.log(error1);
        }

        const exchange = 'headerTest';
        const queue = 'testQueue';
        channel.assertExchange(exchange, 'headers', {durable: false})
        channel.assertQueue(queue, {autoDelete: false}, (error, queue) => {
            console.log(`Waiting for the messages in queue: ${queue.queue}`);
            channel.bindQueue(queue.queue, exchange, '', {
                'login': 'user',
                'password': 'test',
                'method': 'facebook',
                'x-match': 'any',
            },)
            channel.consume(queue.queue, function (message) {
                if (message?.content) {
                    console.log(`Credential Key's: ${JSON.stringify(message.properties.headers)}, Message: ${message.content}`);
                }
            }, {
                noAck: true
            })
        });
    });
})