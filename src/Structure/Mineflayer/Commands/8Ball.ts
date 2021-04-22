import { AggregationCursor } from 'mongoose';
import BotCore from '../../BotCore';
import MineflayerBot from '../../MineflayerBot';
import Command from '../MineflayerCommand';

module.exports = class extends Command {
    responses: string[];
	constructor(discordBot: BotCore) {
        super(discordBot, '8ball', {
            description: "Let the fates decide",
            usage: "%p8ball <Your question>"
        });

        this.responses = [
            "It is certain.",
            "Without a doubt.",
            "You may rely on it",
            "Yes, definitely.",
            "It is decidedly so.",
            "As I see it, yes.",
            "Most likely.", 
			"Yes.",
            "outlook good.",
            "Signs point to yes",
            "Reply hazy try again.",
            "Better not tell you now.",
            "Ask again later.",
            "Cannot predict now.",
            "Concentrate and ask again.",
            "Dont count on it.",
            "Outlook not so good",
            "My sources say no.",
            "Very doubtful",
            "My reply is no."
        ]
    }

    async run(_args: string[], minecraftBot: MineflayerBot, _, _playerName) {
		minecraftBot.bot.chat(`${_playerName}, ${this.responses[Math.floor(Math.random() * this.responses.length)]}`)
    }
}