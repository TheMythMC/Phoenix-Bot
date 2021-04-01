import { glob } from 'glob-promise';
import MineflayerCommand from './MineflayerCommand'
import path from 'path';
import Util from '../../utils/Util';
import MineflayerManager from '../MineflayerManager';
import BotCore from '../BotCore';


export default class MineflayerCommandManager {
    commands: Map<String, MineflayerCommand>;
    aliases: Map<String, String>;
    filepath: string;
    constructor () {
        this.commands = new Map();
        this.aliases = new Map();
        this.filepath = `${path.dirname(require.main.filename)}${path.sep}`;
    }
    
    runCommand(message: string, playername: string, bot: MineflayerManager, discordBot: BotCore) {
        let [cmd, ...args] = message.split(/\S+/g) || [];
        for(const [key, value] of this.commands) {
            if(key === cmd) value.run(args, bot, discordBot, playername);
            value.aliases.forEach(element => {
                if(element === cmd) value.run(args, bot, discordBot, playername);
            });
        }
    }

    loadCommands(mcBot: MineflayerManager, dirPath: string) {
        return glob(`${this.filepath}${dirPath}/**/*.js`, 
        (err, matches) => {
            for (let match of matches) {
                delete require.cache[match];
                const { name } = path.parse(match);
                const File = require(match);
                if(!Util.isClass(File)) throw new TypeError(`The command ${name} does not export a class.`);
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
                this.commands.set(File.name, File);
                if(File.aliases.length) {
                    for(const alias of File.aliases) {
                        this.aliases.set(alias, command.name);
                    }
                }
            }
        });
    }
}