const Command = require("../../../Structure/Command");

const GuildRole = require("../../../RoleSync/RoleTemplates/GuildRole"); 

const Rank = require("../../../RoleSync/RoleTemplates/Rank"); 

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