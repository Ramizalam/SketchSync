import { redisClient } from "../config/RedisClient.js";

class RedisService {
  private static _instance: RedisService | null;

  private constructor() {}

  public static getInstance() {
    if (!RedisService._instance) {
      RedisService._instance = new RedisService();
    }
    return RedisService._instance;
  }

  public async setEntity<T>(id: string, value: T): Promise<void> {
    await redisClient.set(id, JSON.stringify(value));
  }

  public async getEntity<T>(id: string): Promise<T | null> {
    const data = await redisClient.get(id);
    return data ? JSON.parse(data) as T : null;
  }

  public async remove(id: string): Promise<void> {
    await redisClient.del(id);
  }

  public async has(id: string): Promise<boolean> {
    const exists = await redisClient.exists(id);
    return exists === 1;
  }
}

export const redisService = RedisService.getInstance();
