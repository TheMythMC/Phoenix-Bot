const Bot = require("../../Bot"); 

const GuildRole = async (uuid, cache, params) => {
    const guild = params[0];
    if (!guild) return;

    let slothpixel = Bot.getBot().slothpixel; 

    if (!cache.guilds) cache.guilds = []; 

    try {
        const f = cache?.guilds.find(g => g.id === guild || g.name === guild); 
        let guildData = f || await slothpixel(`guilds/${uuid}`); 

         if (!guildData) return false; 

         if (guildData.name === guild || guildData.id === guild) {
            if (!f) cache.guilds.push(guildData); 
            return true; 
         }
         return false; 
    } catch (err) {
        return false; 
    }
}

module.exports = GuildRole;