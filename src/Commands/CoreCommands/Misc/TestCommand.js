const Command = require("../../../Structure/Command");

const checkGexp = require("../../../GEXPChecker/CheckGEXP"); 

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
        console.log(await checkGexp(client, message.guild)); 
    }
}

module.exports = TestCommand;