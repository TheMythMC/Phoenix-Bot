import path from "path";
import glob from "glob";
import pathParse from "path-parse";
import { randomBytes } from "crypto";
import DiscordOAuthData from "../Schemas/DiscordOAuthData";
import GuildData from "../Schemas/GuildData";
import Bot from "../Bot";
import { GuildMember } from "discord.js";
import Command from "../Structure/Command";
import config from "../../config.json";

export default class Util {
  static isClass(input: Object) {
    return (
      typeof input === "function" && typeof input.prototype === "object" && input.toString().substring(0, 5) === "class"
    );
  }
  static get directory() {
    return `${path.dirname(require.main.filename)}${path.sep}`;
  }

  static async loadCommands(client, path: string) {
    return glob(`${this.directory}${path}/**/*.js`, {}, (err, commands) => {
      for (const commandFile of commands) {
        // TODO: why does path.parse not work :(
        delete require.cache[commandFile];
        const { name } = pathParse(commandFile);
        const File = require(commandFile);
        if (!this.isClass(File)) throw new TypeError(`The command ${name} does not export a class.`);
        const command = new File(client, name.toLowerCase());
        client.commands.set(command.name, command);
        console.log(`Set ${command.name} as a command`);
        if (command.aliases.length) {
          for (const alias of command.aliases) {
            client.aliases.set(alias, command.name);
          }
        }
      }
    });
  }
  static formatNumber(number: number) {
    return number.toLocaleString("en-US", { maximumFractionDigits: 2 });
  }
  static removeDuplicates(arr: any[]) {
    return [...new Set(arr)];
  }
  static capitalize(string: string) {
    let capitalized = string.split(" ");
    let tempArray = new Array();
    for (let word in capitalized) {
      let temparray = word.split("");
      tempArray[0].toUpperCase();
      tempArray.push(temparray.join(""));
    }
    return tempArray.join(" ");
  }

  static genRandomKey(bytes = 16) {
    return randomBytes(bytes).toString("hex");
  }
  static wait(milliseconds: number) {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  }

  // this is for checking if a session is permitted to access a certain guild
  static async isSessionPermitted(sessionID: string, guildID: string, bot: Bot): Promise<boolean> {
    if (!sessionID) return false;

    const accessToken = await this.getAccessToken(sessionID);
    if (!accessToken) return false; // invalid session id
    const { id } = await bot.DiscordAPIUserCache.getDiscordData(accessToken);

    const guild = await bot.CoreBot.guilds.fetch(guildID);
    const guildMember = await guild.members.fetch(id);

    if (!guildMember) return false; // ur not even in that server what are you doing trying to modify stuff on that server >:(

    // get guild data
    const gData = await GuildData.findOne({ ServerID: guildID }).exec();

    const perms = gData?.DashboardPerms || ["ADMINISTRATOR"];

    const roles = gData?.DashboardRoles || [];

    return (
      guildMember.hasPermission(perms) ||
      ((): boolean => {
        // PLEASE FORGIVE ME!!!
        for (const role of roles) {
          if (guildMember.roles.cache.has(role)) return true;
        }
        return false;
      })()
    );
  }

  static async getAccessToken(sessionID: string) {
    const data = await DiscordOAuthData.findOne({
      SessionID: sessionID,
    }).exec();
    return data?.AccessToken;
  }

  static isCommandAllowed(member: GuildMember, command: Command): boolean {
    if (command.requireBotOwner && !config.BotOwners.includes(member.id)) return false;
    for (const perm of command.requiredPerms) {
      if (!member.hasPermission(perm)) return false;
    }
    return true;
  }
}

module.exports = Util;
