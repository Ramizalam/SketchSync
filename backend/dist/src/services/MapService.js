class MapService {
    static _instance;
    map = new Map();
    constructor() { }
    static getInstance() {
        if (!MapService._instance) {
            MapService._instance = new MapService();
        }
        return MapService._instance;
    }
    setEntity(id, value) {
        console.log(`[MapService] Setting entity: ${id}`);
        this.map.set(id, value);
    }
    getEntity(id) {
        const exists = this.map.has(id);
        console.log(`[MapService] Getting entity: ${id}. Found: ${exists}`);
        return this.map.get(id);
    }
    remove(id) {
        return this.map.delete(id);
    }
}
export const mapService = MapService.getInstance();
//# sourceMappingURL=MapService.js.map