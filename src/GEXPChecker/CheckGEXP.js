const HypixelAPI = require("../Structure/HypixelAPI"); 

module.exports = async (client, guild, guildCheckDays) => {
    const g = await client.Bot.GuildManager.getGuild(guild.id); 
    if (!g || !g.data.GuildID) return {}; 
    const data = await g.data.GEXPData; 
    
    // get data for guild
    const guildData = HypixelAPI.getGuildDataByName(g.data.GuildID); // TODO: replace with getGuildDataByID, pretend g.data.GuildID is guild name for now
    
    let res = {}; 

    // please optimize this looks so ugly i hate it but idk how to optimize  - Banana
    for (member of guildData.members) {
        let gexp = 0; 
        const xpHistory = Object.values(member.exp_history);
        for (let i = 0; i < guildCheckDays; i++) { // standard for loop cuz of the guildCheckDays
            if (!xpHistory[i]) break; 
            gexp += xpHistory[i]; 
        }

        const roleReq = data.find(d => d.RoleName === member.rank);
        if (!roleReq) continue; 
        res[member.uuid] = { // TODO: change to displaying name instead of UUID
            Rank: member.rank, 
            Gexp: gexp, 
            Passed: gexp >= roleReq.MinExp 
        }
    }

    /*
    
    {
        "MemberName: String": {
            Rank: String, 
            Gexp: Integer, 
            Passed: Boolean
        }
    }
    
    */
}