const Command = require("../../../Structure/Command");

const rank = require("../../../RoleSync/RoleTemplates/Rank"); 
const guildrole = require("../../../RoleSync/RoleTemplates/GuildRole"); 
const guildrank = require("../../../RoleSync/RoleTemplates/GuildRank"); 

class TestCommand extends Command {
    constructor(client) {
        super(client, "testcommand", {
            aliases: [],
            description: "Test Command to see if bot is working",
            category: "Misc",
            usage: `%pTestCommand`,
            requiredPerms: []
        });
    }

    async run(message, args, client) {
        
    }
}

module.exports = TestCommand;