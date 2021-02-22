const Command = require("../../../Structure/Command");

class TestCommand extends Command {
    constructor(client) {
        super(client, "TestCommand", {
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