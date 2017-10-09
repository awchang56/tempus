const redis = require('redis');
const client = redis.createClient();


client.on('error', err => {
  console.log('error connecting to redis: ', err);
});

client.on('connect', function() {
    console.log('redis connection established');
});

module.exports = client;