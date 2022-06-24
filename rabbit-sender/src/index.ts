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
        const message = "I want to create a new post";
        channel.assertExchange(exchange,'headers', {durable: false});
        channel.assertQueue(queue, {durable: true, autoDelete: false});
        channel.publish(exchange, '', Buffer.from(message), {
            headers: {
                login: 'bryan',
                password: 'test',
                method: 'facebook'
            }
        });
        console.log('Sent: ' + message);
    });
    setTimeout(function () {
        connection.close();
        process.exit(0);
    }, 500);
})