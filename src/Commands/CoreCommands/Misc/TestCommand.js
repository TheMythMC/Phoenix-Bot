const Command = require("../../../Structure/Command");

const MojangAPI = require('../../../Structure/MojangAPI');

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
        console.log(await MojangAPI.UUIDToName("b428763f1a534de0aa222b1da66f9fd9"));
        console.log(await MojangAPI.nameToUUID("BananasAmIRite"));

    }
}

module.exports = TestCommand;