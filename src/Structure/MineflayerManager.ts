import mineflayer from "mineflayer";
import { IPremiumLinkData } from "../Schemas/PremiumLinkData";
import Bot from "../Bot";
import MineflayerCommandManager from "./Mineflayer/MineflayerCommandManager";
import { Channel, TextChannel } from "discord.js";

const joinMessages: string[] = [
    '%n just joined the server - glhf!', '%n just joined. Everyone, look busy!', '%n just joined. Can I get a heal?',
    '%n joined your party.', '%n joined. You must construct additional pylons.', 'Ermagherd. %n is here.', 'Welcome, %n. Stay awhile and listen.',
    'Welcome, %n. We were expecting you ;)', 'Welcome, %n. We hope you brought pizza.', 'Welcome %n. Leave your weapons by the door.',
    'A wild %n appeared.', 'Swoooosh. %n just landed.', 'Brace yourselves. %n just joined the guild.', '%n just joined. Hide your bananas.',
    '%n just arrived. Seems OP - please nerf.', '%n just slid into the guild.', 'A %n has spawned in the server.', 'Big %n showed up!',
    'Where’s %n? In the guild!', '%n hopped into the server. Kangaroo!!', '%n just showed up. Hold my beer.', 'Challenger approaching - %n has appeared!',
    'It\'s a bird! It\'s a plane! Nevermind, it\'s just %n.', 'It\'s %n! Praise the sun! [T]/', 'Never gonna give %n up. Never gonna let %n down.',
    'Ha! %n has joined! You activated my trap card!', 'Cheers, love! %n\'s here!', 'Hey! Listen! %n has joined!', 'We\'ve been expecting you %n.',
    'It\'s dangerous to go alone, take %n!', '%n has joined the server! It\'s super effective!', 'Cheers, love! %n is here!', '%n is here, as the prophecy foretold.',
    '%n has arrived. Party\'s over.', 'Ready player %n', '%n is here to kick butt and chew bubblegum. And %n is all out of gum.', 'Hello. Is it %n you\'re looking for?',
    '%n has joined. Stay a while and listen!', 'Roses are red, violets are blue, %n joined this guild with you'
]

export default class MineflayerManager {

  bot: Bot;
  MineCraftBots: Map<string, mineflayer.Bot>;
  constructor(bot: Bot, guilds: IPremiumLinkData[]) {
    new MineflayerCommandManager().loadCommands(
      this,
      "./Mineflayer/Commands/**/*.js"
    );
    this.bot = bot;
    this.MineCraftBots = new Map();
    guilds.forEach(async (guild) => {
      if (
        Bot.getBot().GuildManager.isPremium(guild.id) &&
        guild.ServerID &&
        guild.isBotOnline &&
        guild.BotUsername &&
        guild.BotPassword
      ) {
        console.log(`Set mineflayer bot for guild ${bot.CoreBot.guilds.cache.get(guild.ServerID).name}`)
        this.MineCraftBots.set(guild.ServerID, this.createBot(guild));
      }
    });
  }

  getMCBots() {
    return this.MineCraftBots;
  }
  createBot(guildData: IPremiumLinkData) {
    let bot = mineflayer.createBot({
      username: guildData.BotUsername,
      password: guildData.BotPassword,
      // @ts-ignore
      auth: guildData.BotAuth,
      version: "1.8.9",
      host: "buyphoenix.hypixel.net",
      port: 25565,
    });

    bot.chatAddPattern(/(\[.+\]) (.+) \[(.+)\]: (.+)/, "guildChat");

    bot.on("error", (err) => {
      console.log(err);
    });

    bot.on("spawn", () => {
      bot.chat("/achat §c"); // send to limbo
    });

    bot.on("kicked", (reason, isLoggedIn) => {
      if (!isLoggedIn) {
        // error on joining
        this.bot.EventEmmiter.emit("botJoinFailed", [reason]);
        this.MineCraftBots.delete(guildData.ServerID); // remove the bot
        return;
      }
      this.MineCraftBots.set(guildData.ServerID, this.createBot(guildData));
    });

    // bot.on("end", () => {
    //   this.MineCraftBots.set(guildData.ServerID, this.createBot(guildData));
    // });

    bot.on(
      // @ts-ignore
      "guildChat", async (
        _globalRank: string,
        name: string,
        _guildRank: string,
        message: string
      ) => {
        if (message.startsWith(guildData.MCPrefix) && name.toLowerCase() === bot.username.toLowerCase()) {
          new MineflayerCommandManager().runCommand(
            message.substring(guildData.MCPrefix.length, message.length),
            name,
            this,
            Bot.getBot().CoreBot
          );
        }
        if(guildData.Logging) {
          let tempLogChannel: Channel = await this.bot.CoreBot.channels.fetch(guildData.LogChannel) || null;

          if(tempLogChannel === null) 
            bot.chat("The log channel has an invalid ID. Please contact guild administrators if this issue isn\'t resolved");

          // Checks if its text (should always be, will throw error)
          if (tempLogChannel.isText()) {
            let logChannel: TextChannel = tempLogChannel as TextChannel;
            logChannel.send(`\`${name}: ${message}\``);
          } else {
            bot.chat("The log channel has an invalid ID or is a Voice Channel. Please contact guild staff/the guild master.")
          }
        }

        if (message.match(/(.+) has requested to join the Guild!/i)) {
          let [name, _rest] = message.split(/(.+) has requested to join the Guild!/i);
          if (guildData.StaffPing) {
            let tempLogChannel: Channel = await this.bot.CoreBot.channels.fetch(guildData.LogChannel) || null;

            if(tempLogChannel === null) 
              return;

            // Checks if its text (should always be, will throw error)
            if (tempLogChannel.isText()) {
              let logChannel: TextChannel = tempLogChannel as TextChannel;
              logChannel.send(`<@${guildData.StaffRole}>, ${name} has accepted to join the guild! To accept them type %naccept ${name}`
              .replace('%n', 'guildData.pre'));
            }
          }
        }

        if (message.match(/(.+) has joined the Guild!/i)) {
          let [name, _rest] = message.split(/(.+) has requested to join the Guild!/i);
          bot.chat(`${joinMessages[Math.floor(Math.random() * joinMessages.length)].replace('%n', name)}`);
        }
      }
    );

    return bot;
  }
}
