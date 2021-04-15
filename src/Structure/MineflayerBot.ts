import mineflayer, { BotOptions } from 'mineflayer';
import Bot from '../Bot';
import { IPremiumLinkData } from '../Schemas/PremiumLinkData';
import MineflayerManager from './MineflayerManager';
import { Channel, TextChannel } from 'discord.js';
import MineflayerCommandManager from './Mineflayer/MineflayerCommandManager';
import GuildData from '../Schemas/GuildData';

const joinMessages: string[] = [
  '%n just joined the guild - glhf!',
  '%n just joined. Everyone, look busy!',
  '%n just joined. Can I get a heal?',
  '%n joined your party.',
  '%n joined. You must construct additional pylons.',
  'Ermagherd. %n is here.',
  'Welcome, %n. Stay awhile and listen.',
  'Welcome, %n. We were expecting you ;)',
  'Welcome, %n. We hope you brought pizza.',
  'Welcome %n. Leave your weapons by the door.',
  'A wild %n appeared.',
  'Swoooosh. %n just landed.',
  'Brace yourselves. %n just joined the guild.',
  '%n just joined. Hide your bananas.',
  '%n just arrived. Seems OP - please nerf.',
  '%n just slid into the guild.',
  'A %n has spawned in the guild.',
  'Big %n showed up!',
  'Where’s %n? In the guild!',
  '%n hopped into the guild. Kangaroo!!',
  '%n just showed up. Hold my beer.',
  'Challenger approaching - %n has appeared!',
  'It\'s a bird! It\'s a plane! Nevermind, it\'s just %n.',
  'It\'s %n! Praise the sun! [T]/',
  'Never gonna give %n up. Never gonna let %n down.',
  'Ha! %n has joined! You activated my trap card!',
  'Cheers, love! %n\'s here!',
  'Hey! Listen! %n has joined!',
  'We\'ve been expecting you %n.',
  'It\'s dangerous to go alone, take %n!',
  '%n has joined the guild! It\'s super effective!',
  'Cheers, love! %n is here!',
  '%n is here, as the prophecy foretold.',
  '%n has arrived. Party\'s over.',
  'Ready player %n',
  '%n is here to kick butt and chew bubblegum. And %n is all out of gum.',
  'Hello. Is it %n you\'re looking for?',
  '%n has joined. Stay a while and listen!',
  'Roses are red, violets are blue, %n joined this guild with you',
];

export default class MineflayerBot {
  premiumData: IPremiumLinkData;
  bot: mineflayer.Bot;
  Client: Bot;
  manager: MineflayerManager;
  options: BotOptions;
  commandManager: MineflayerCommandManager;
  constructor(bot: Bot, manager: MineflayerManager, data: IPremiumLinkData, options: BotOptions) {
    this.bot = mineflayer.createBot(options);
    this.premiumData = data;
    this.options = options;
    this.Client = bot;
    this.manager = manager;
    this.commandManager = new MineflayerCommandManager(manager.CommandCache, manager.AliasesCache); // NOT load in every time a bot instantiates
    this.setupBot();
  }

  setupBot() {
    this.bot.addChatPattern('guildChat', /(\[.+\]) (.+) \[(.+)\]: (.+)/, {
      repeat: true,
      parse: true
    });

    this.bot.on('error', (err) => {
      console.log(err);
    });

    this.bot.on('spawn', () => {
      this.bot.chat('/achat §c'); // send to limbo
      this.status = true;
    });

    this.bot.on('kicked', (reason, isLoggedIn) => {
      if (!isLoggedIn) {
        // error on joining
        this.Client.EventEmmiter.emit('botJoinFailed', this.premiumData.ServerID, reason);
        this._removeBot();
        return;
      }
      if (this.premiumData.botAutoRun) {
        this.manager.MineCraftBots.set(
          this.premiumData.ServerID,
          new MineflayerBot(this.Client, this.manager, this.premiumData, this.options)
        );
      } else {
        // shut down the bot and update status
        this._removeBot();
      }
    });

    // bot.on("end", () => {
    //   this.MineCraftBots.setBot(guildData.ServerID, this.createBot(guildData));
    // });

    this.bot.on(
      // @ts-ignore
      'guildChat',
      async (_globalRank: string, name: string, _guildRank: string, message: string) => {
        if (message.startsWith(this.premiumData.MCPrefix) && name.toLowerCase() === this.bot.username.toLowerCase()) {
          this.commandManager.runCommand(
            message.substring(this.premiumData.MCPrefix.length, message.length),
            name,
            this,
            Bot.instance.CoreBot
          );
        }
        if (this.premiumData.Logging) {
          let tempLogChannel: Channel = (await this.Client.CoreBot.channels.fetch(this.premiumData.LogChannel)) || null;

          if (tempLogChannel === null)
            this.bot.chat(
              'The log channel has an invalid ID. Please contact guild administrators if this issue isn\'t resolved'
            );

          // Checks if its text (should always be, will throw error)
          if (tempLogChannel.isText()) {
            let logChannel: TextChannel = tempLogChannel as TextChannel;
            logChannel.send(`\`${name}: ${message}\``);
          } else {
            this.bot.chat(
              'The log channel has an invalid ID or is a Voice Channel. Please contact guild staff/the guild master.'
            );
          }
        }
      }
    );

    // Invite and join checking
    this.bot.on('chat', async (_username: string, _message: string) => {
      let arrmessage: string[] = [_username, _message];
      let message: string = arrmessage.join(' ');

      if (message.match(/(\w+) joined the guild!/)) {
        this.bot.chat(
          joinMessages[Math.floor(Math.random() * joinMessages.length)].replace(
            '%n',
            message.split(/(\w+) joined the guild!/)[0]
          )
        );
      } else if (message.match(/(\w+) has requested to join the Guild!/)) {
        let username = message.split(/(\w+) (.+)/)[0];
        let channel: TextChannel = this.Client.CoreBot.channels.cache.get(this.premiumData.LogChannel) as TextChannel;
        if (channel == null) return; // TEMP
        channel.send(
          `<@${this.premiumData.StaffRole}>, ${username} has requested to join the guild! Type ${
            /* Frogive me father, for I have sinned */ (await GuildData.find().exec()).forEach((guild) => {
              if (guild.id === this.premiumData.ServerID) return guild.Prefix;
            })
          }accept ${username} to let them in!`
        );
      } else if (message.match(/(\w+) left the guild!/)) {
        let username = message.split(/(\w+) (.+)/)[0];
        this.bot.chat(`See ya later, ${username}! We hope you enjoyed your stay! \:\)`);
      }
    });
  }

  set status(s: boolean) {
    this.Client.EventEmmiter.emit('botStatusChanged', this.premiumData.ServerID, s);
    this.premiumData.isBotOnline = s;
    this.premiumData.save();
  }

  _removeBot() {
    this.manager.MineCraftBots.delete(this.premiumData.ServerID); // remove the bot
    this.status = false;
  }
}
