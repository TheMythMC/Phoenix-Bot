const Bot = require("../../Bot"); 

const GuildRank = async (uuid, cache, params) => {
    const role = params[0];
    if (!role) return;

    let slothpixel = Bot.getBot().slothpixel; 

    if (!cache.guilds) cache.guilds = []; 

    try {
        const f = cache?.guilds.find(g => g.id === guild || g.name === guild); 
        let guildData = f || await slothpixel(`guilds/${uuid}`); 

         if (!guildData) return false; 

         

         const member = guildData.members.find(m => m.rank === role && m.uuid === uuid); 
         if (member) {
            if (!f) cache.guilds.push(guildData); 
             return true; 
         }

    } catch (err) {
        return false; 
    }

    return false; 
}

module.exports = GuildRank;