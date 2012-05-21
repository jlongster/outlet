
var redis = require('redis');
var client = redis.createClient();

// client.on('error', function(err) {
//     console.log('error: ' + err);
// });

client.set('foo', 'bar');
client.set('bar', 'biz');
client.set('biz', 'hallo!');

client.get('foo', function(err, reply) {
    console.log(reply);

    client.get(reply, function(err, reply) {
        console.log(reply);

        client.get(reply, function(err, reply) {
            console.log(reply);
            client.end();
        });
    });
});
