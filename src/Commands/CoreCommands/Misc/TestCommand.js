const Command = require("../../../Structure/Command");

const GuildRole = require("../../../RoleSync/RoleTemplates/GuildRole"); 

const Rank = require("../../../RoleSync/RoleTemplates/Rank"); 
const RankSync = require("../../../RoleSync/RoleSync"); 

const { performance } = require("perf_hooks"); 

const ranks = [ 
    {
        DiscordRoleID: "817204448631062558", 
        RoleTemplate: "Rank", 
        Params: ["MVP_PLUS_PLUS"]
    }, 
    {
        DiscordRoleID: "817188603360444416", 
        RoleTemplate: "Rank", 
        Params: ["MVP_PLUS"]
    }, 
    {
        DiscordRoleID: "817204540851879967", 
        RoleTemplate: "Rank", 
        Params: ["MVP"]
    }, 
    {
        DiscordRoleID: "817204579434627072", 
        RoleTemplate: "Rank", 
        Params: ["VIP_PLUS"]
    }, 
    {
        DiscordRoleID: "817204614701121558", 
        RoleTemplate: "Rank", 
        Params: ["VIP"]
    }, 
]; 

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