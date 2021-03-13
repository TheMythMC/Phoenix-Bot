module.exports = async (client, guild) => {
    const g = await client.Bot.GuildManager.getGuild(guild.id); 
    const data = await g.data.GEXPData;  
}