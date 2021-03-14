const MojangAPI = require('../../../Structure/MojangAPI');
const conf = require("../../config.json"); 

class UUIDManager {
    constructor() {
        this.cache = []; 
        if (config.UUIDUsernameAPICache) {
            const self = this; 
            setInterval(() => {
                self._resetCache(self); 
            }, config.UUIDUsernameAPICacheTime || 600000); 
        }
    }

    getUUIDByUser(username) {
        if (conf.UUIDUsernameAPICache) {
            let cacheHit = this.cache.find(data => data.name.toLowerCase() === username.toLowerCase()); 
            if (cacheHit) return cacheHit.id; 
        }

        let data = await MojangAPI.nameToUUID(username); 
        if (data) {
            this.cache.push(data); 
            return data; 
        }
    }

    getUserByUUID(uuid) {
        if (conf.UUIDUsernameAPICache) {
            let cacheHit = this.cache.find(data => data.name.toLowerCase() === uuid.toLowerCase()); 
            if (cacheHit) return cacheHit.id; 
        }

        let data = await MojangAPI.nameToUUID(username); 
        if (data) {
            this.cache.push(data); 
            return data; 
        }
    }

    _resetCache(self) {
        self.cache = []; 
    }
}

module.exports = UUIDManager; 