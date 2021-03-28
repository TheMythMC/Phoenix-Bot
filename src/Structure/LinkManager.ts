import * as MinecraftLinkData from '../Schemas/MinecraftLinkData'

export default class LinkManager {
    cache: any[];
    constructor() {
        this.cache = []; 
    }

    async getDataByUUID(uuid) {
        const cache = this.cache.find(v => v.MinecraftUUID === uuid); 
        if (cache) {
            return cache; 
        }

        const data = await MinecraftLinkData.Model.findOne({ MinecraftUUID: uuid });  
        if (data) {
            this.cache.push(data); 
            return data; 
        }
    }

    async getDataByDiscord(id) {
        const cache = this.cache.find(v => v.DiscordID === id); 
        if (cache) return cache; 

        const data = await MinecraftLinkData.Model.findOne({ DiscordID: id });  
        if (data) {
            this.cache.push(data); 
            return data; 
        }
    }

    async removeDiscordFromCache(id) {
        this.cache.splice(this.cache.findIndex(v => v.DiscordID === id), 1); 
    }

    async removeUUIDFromCache(uuid) {
        this.cache.splice(this.cache.findIndex(v => v.MinecraftUUID === uuid), 1); 
    }

    async addCache(obj) {
        this.cache.push(obj); 
    }
}