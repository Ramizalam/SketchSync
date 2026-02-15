import { createClient } from "redis";

export const redisClient = createClient({
    username: 'default',
    password: process.env.REDIS_PASSWORD || "",
    socket: {
        host: 'redis-16202.c14.us-east-1-2.ec2.cloud.redislabs.com',
        port: parseInt(process.env.REDIS_PORT || '16202')
    }
});


await redisClient.connect();
