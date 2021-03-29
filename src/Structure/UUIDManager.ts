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

    async getUUIDByUser(username: string) {
        if (conf.UUIDUsernameAPICache) {
            let cacheHit = this.cache.find(data => (data).name.toLowerCase() === username.toLowerCase()); 
            if (cacheHit) return cacheHit.id; 
        }

        let data = await MojangAPI.getByName(username); 
        if (data) {
            this.saveCache(data); 
            return data.uuid; 
        }
    }

    async getUserByUUID(uuid: string) {
        if (conf.UUIDUsernameAPICache) {
            let cacheHit = this.cache.find(data => (data).name.toLowerCase() === uuid.toLowerCase()); 
            if (cacheHit) return cacheHit.name; 
        }

        let data = await MojangAPI.getByUUID(uuid); 
        if (data) {
            this.saveCache(data); 
            return data.username; 
        }
    }

    saveCache(data) {
        if (conf.UUIDUsernameAPICache) {
            this.cache.push(data); 
        }
    }

    _resetCache(self: this) {
        self.cache = []; 
    }
}

module.exports = UUIDManager; 