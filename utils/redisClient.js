const redis = require('redis');

const redisClient = redis.createClient({
  url: process.env.REDIS_URL,
});
/* eslint-disable no-console */
redisClient.on('connect', () => console.log('Connected to Redis'));
redisClient.on('error', (err) => console.error('Redis Client Error:', err));
/* eslint-enable no-console */
module.exports = redisClient;
