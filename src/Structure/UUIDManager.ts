import * as MojangAPI from './MojangAPI'
const conf = require("../../config.json"); 

export default class UUIDManager {
    cache: any[];
    constructor() {
        this.cache = []; 
        if (conf.UUIDUsernameAPICache) {
            const self = this; 
            setInterval(() => {
                self._resetCache(self); 
            }, conf.UUIDUsernameAPICacheTime || 600000); 
        }
    }

    async getUUIDByUser(username: String): Promise<String> {
        if (conf.UUIDUsernameAPICache) {
            let cacheHit = this.cache.find(data => (data).name.toLowerCase() === username.toLowerCase()); 
            if (cacheHit) return cacheHit.id; 
        }

        let data = await MojangAPI.getByName(username); 
        if (data) {
            this.saveCache(data); 
            return data.id; 
        }
    }

    async getUserByUUID(uuid: String): Promise<String> {
        if (conf.UUIDUsernameAPICache) {
            let cacheHit = this.cache.find(data => (data).name.toLowerCase() === uuid.toLowerCase()); 
            if (cacheHit) return cacheHit.name; 
        }

        let data = await MojangAPI.getByUUID(uuid); 
        if (data) {
            this.saveCache(data); 
            return data.name; 
        }
    }

    saveCache(data): void {
        if (conf.UUIDUsernameAPICache) {
            this.cache.push(data); 
        }
    }

    _resetCache(self: UUIDManager): void {
        self.cache = []; 
    }
}
module.exports = UUIDManager;
