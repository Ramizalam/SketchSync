declare class RedisService {
    private static _instance;
    private constructor();
    static getInstance(): RedisService;
    setEntity<T>(id: string, value: T): Promise<void>;
    getEntity<T>(id: string): Promise<T | null>;
    remove(id: string): Promise<void>;
    has(id: string): Promise<boolean>;
}
export declare const redisService: RedisService;
export {};
//# sourceMappingURL=RedisService.d.ts.map