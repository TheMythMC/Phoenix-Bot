import { glob } from "glob-promise";
import MineflayerCommand from "./MineflayerCommand";
import path from "path";
import Util from "../../utils/Util";
import BotCore from "../BotCore";
import MineflayerBot from "../MineflayerBot";

export default class MineflayerCommandManager {
  commands: Map<String, MineflayerCommand>;
  aliases: Map<String, String>;
  static FILE_PATH = `${path.dirname(require.main.filename)}${path.sep}`;
  constructor(commands: Map<String, MineflayerCommand> = new Map(), aliases: Map<String, String> = new Map()) {
    this.commands = commands;
    this.aliases = aliases;
  }

  runCommand(message: string, playername: string, bot: MineflayerBot, discordBot: BotCore) {
    let [cmd, ...args] = message.split(/\S+/g) || [];
    for (const [key, value] of this.commands) {
      if (key === cmd) /* EFFICENCY */ return value.run(args, bot, discordBot, playername);
      value.aliases.forEach((alias) => {
        if (alias === cmd) /* EFFICENCY */ return value.run(args, bot, discordBot, playername);
      });
    }
  }

  static loadCommand(dirPath: string, discordBot: BotCore) {
    let commands = new Map<string, MineflayerCommand>();
    let aliases = new Map<string, string>();

    glob(`${this.FILE_PATH}${dirPath}/**/*.js`, (err, matches) => {
      for (let match of matches) {
        delete require.cache[match];
        const { name } = path.parse(match);
        const File = require(match);
        if (!Util.isClass(File)) throw new TypeError(`The command ${name} does not export a class.`);
        const command = new File(discordBot, name.toLowerCase());
        if (!(command instanceof MineflayerCommand))
          throw new TypeError(`The command ${name} doesn't belong in Commands.`);
        // LEFT HERE FOR REFRENCE
        /*client.commands.set(command.name, command);
                console.log(`Set ${command.name} as a command`);
                if(command.aliases.length) {
                    for(const alias of command.aliases) {
                        client.aliases.set(alias, command.name);
                    }
                } */
        commands.set(File.name, File);
        if (File.aliases.length) {
          for (const alias of File.aliases) {
            aliases.set(alias, command.name);
          }
        }
      }
    });

    return {
      commands: commands,
      aliases: aliases,
    }; // i couldnt return multiple soooooo
  }
}
