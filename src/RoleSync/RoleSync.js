
// im too lazy to make registration system so im just resorting to this
const roleMethods = {
    "GuildRank": require("./RoleTemplates/GuildRank"), 
    "Rank": require("./RoleTemplates/Rank")
};

module.exports = async (member, uuid, roleLinks) => {
    const guild = member.guild;

    const cache = {}; 

    for (const roleLink of roleLinks) {
        let meth = roleMethods[roleLink.RoleTemplate];
        if (!meth) continue;

        const res = await meth(uuid, cache, roleLink.Params);
        if (res) {
            const role = await guild.roles.fetch(roleLink.DiscordRoleID);

            if (!role) continue;

                await member.roles.add(role); // throws error; make it silently be caught higher up (not here)
        }
    }
}

module.exports.RoleMethods = roleMethods;