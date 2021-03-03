const Bot = require("../../Bot"); 

const GuildRole = async (uuid, params) => {
    const role = params[0];
    if (!role) return;

    let slothpixel = Bot.getBot().slothpixel; 

    try {
        let guildData = await slothpixel(`guilds/${uuid}`);
         if (!guildData) return false; 
         const member = guildData.members.find(m => m.rank === role && m.uuid === uuid); 
         if (member) return true; 

    } catch (err) {
        return false; 
    }

    return false; 
}

module.exports = GuildRole;