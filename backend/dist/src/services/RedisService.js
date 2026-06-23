import { redisClient } from "../config/RedisClient.js";
class RedisService {
    static _instance;
    constructor() { }
    static getInstance() {
        if (!RedisService._instance) {
            RedisService._instance = new RedisService();
        }
        return RedisService._instance;
    }
    async setEntity(id, value) {
        await redisClient.set(id, JSON.stringify(value));
    }
    async getEntity(id) {
        const data = await redisClient.get(id);
        return data ? JSON.parse(data) : null;
    }
    async remove(id) {
        await redisClient.del(id);
    }
    async has(id) {
        const exists = await redisClient.exists(id);
        return exists === 1;
    }
}
export const redisService = RedisService.getInstance();
//# sourceMappingURL=RedisService.js.map