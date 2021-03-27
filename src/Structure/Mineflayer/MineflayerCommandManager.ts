const { glob } = require('glob-promise')
import MineflayerCommand from './MineflayerCommand'
const path = require('path');
const Util = require('../../utils/Util');
import { Bot } from 'mineflayer'


export default class MineflayerCommandManager {
    commands: Map<String, MineflayerCommand>;
    aliases: Map<String, String>;
    filepath: string;
    minecraftBot: Bot;
    constructor () {
        this.commands = new Map();
        this.aliases = new Map();
        this.filepath = `${path.dirname(require.main.filename)}${path.sep}`;
    }
    
    runCommand(message, playername, bot, discordBot) {
        let [cmd, ...args] = message.split(/\S+/g) || [];
        for(const [key, value] of this.commands) {
            if(key === cmd) value.run(args, bot, discordBot, playername);
            value.aliases.forEach(element => {
                if(element === cmd) value.run(args, bot, discordBot, playername);
            });
        }
    }

    loadCommands(path, mcBot) {
        return glob(`${this.filepath}${path}/**/*.js`, 
        (err, matches) => {
            for (let match of matches) {
                delete require.cache[match];
                const { name } = path.parse(match);
                const File = require(match);
                if(!Util.isClass()) throw new TypeError(`The command ${name} does not export a class.`);
                const command = new File(mcBot, name.toLowerCase());
                if(!(command instanceof MineflayerCommand)) throw new TypeError(`The command ${name} doesn't belong in Commands.`);
                // LEFT HERE FOR REFRENCE
                /*client.commands.set(command.name, command);
                console.log(`Set ${command.name} as a command`);
                if(command.aliases.length) {
                    for(const alias of command.aliases) {
                        client.aliases.set(alias, command.name);
                    }
                } */
                this.commands.set(match.name, match);
                if(match.aliases.length) {
                    for(const alias of match.aliases) {
                        this.aliases.set(alias, command.name);
                    }
                }
            }
        });
    }
}