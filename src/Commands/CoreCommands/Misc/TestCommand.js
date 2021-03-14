const Command = require("../../../Structure/Command");

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
        console.log(await client.Bot.UUIDManager.cache);
        for (let i = 0; i < 4; i++) {
            console.log(await client.Bot.UUIDManager.getUUIDByUser("BananasAmIRite")); 
        }
        for (let i = 0; i < 4; i++) {
            console.log(await client.Bot.UUIDManager.getUserByUUID("b428763f1a534de0aa222b1da66f9fd9")); 
        }
    }
}

module.exports = TestCommand;