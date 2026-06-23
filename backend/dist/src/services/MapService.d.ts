declare class MapService {
    private static _instance;
    private map;
    private constructor();
    static getInstance(): MapService;
    setEntity<T>(id: string, value: T): void;
    getEntity<T>(id: string): T | undefined;
    remove(id: string): boolean;
}
export declare const mapService: MapService;
export {};
//# sourceMappingURL=MapService.d.ts.map