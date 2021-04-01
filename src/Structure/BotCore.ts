import { Client, Collection } from "discord.js";
import { sendErrorMessage } from "../utils/MessageUtils";
import Util from "../utils/Util";
import path from "path";
import GuildData, { createDefault } from "../Schemas/GuildData";
import PremiumLinkData from "../Schemas/PremiumLinkData";
import config from "../../config.json"; 
import RoleSync from "../RoleSync/RoleSync"; 
import Bot from "../Bot";
import Command from "./Command";

export default class BotCore extends Client {
  commands: any;
  aliases: any;
  Bot: Bot;
  defaultPrefix: string;
  constructor(bot: Bot, options = {} as IBotCore) {
    super({
      disableMentions: "everyone",
    });

    this.validate(options);

    this.commands = new Collection();

    this.aliases = new Collection();

    this.Bot = bot;

    this.defaultPrefix = options.defaultPrefix || "!";

    this.on("guildCreate", this.registerGuild);

    this.on("guildMemberAdd", this.syncGuildMember);

    this.once("ready", () => {
      console.log(`Logged in as ${this.user.username}!`);
    });

    this.on("message", async (message) => {
      let prefix = await this.getPrefix(message.guild);

      if (!message.guild || message.author.bot) return;

      if (!message.content.startsWith(prefix)) return;

      //eslint-disable-next-line no-unused-vars
      const [cmd, ...args] = message.content
        .slice(prefix.length)
        .trim()
        .split(/ +/g);
      const command =
        this.commands.get(cmd.toLowerCase()) ||
        this.commands.get(this.aliases.get(cmd.toLowerCase()));

      if (command) {
        if (
          command.requireBotOwner &&
          !config.BotOwners.includes(message.member.id)
        )
          return sendErrorMessage(
            message.channel,
            "Only the bot owners can execute this command!"
          );
        if (command.requiredPerms) {
          let isAllowed = true;
          command.requiredPerms.forEach((perm) => {
            if (!message.member.hasPermission(perm)) isAllowed = false;
          });
          if (!isAllowed)
            return sendErrorMessage(
              message.channel,
              "You are not a high enough role to use this."
            );
        }
        // noinspection ES6MissingAwait
        command.run(message, args, this);
      }
    });
  }

  validate(options: any) {
    if (typeof options !== "object")
      throw new TypeError("Options must be type of object");

    if (!options.token)
      throw new Error("You must provide a token for the client");
    this.token = options.token;
  }

  async start(token = this.token) {
    await Util.loadCommands(this, `Commands${path.sep}CoreCommands`);
    await super.login(token);
  }

  async getPrefix(guild) {
    return (
      (await this.Bot.GuildManager.getGuild(guild.id))?.data?.Prefix ||
      (await this.Bot.GuildManager.getGuild(guild))?.data?.Prefix ||
      "!"
    );
  }

  async registerGuild(guild) {
    if (await GuildData.exists({ ServerID: guild.id })) return;
    let doc = createDefault(guild.id, this.defaultPrefix);
    doc.save();

    this.Bot.GuildManager.addGuild(doc);

    if (await PremiumLinkData.exists({ ServerID: guild.id })) {
      (await this.Bot.GuildManager.getGuild(guild.id)).premium = true;
    }
  }

  async parsePrefix(guildID, text) {
    return text.replace(/%p/g, await this.getPrefix(guildID));
  }

  async syncGuildMember(member) {
    const d = await this.Bot.LinkManager.getDataByDiscord(member.id);
    if (d) {
      RoleSync(
        member,
        d.MinecraftUUID,
        (await this.Bot.GuildManager.getGuild(member.guild.id))?.data.RoleLinks
      );
    }
  }
}

interface IBotCore {
  token: string;
  defaultPrefix: string;
}
