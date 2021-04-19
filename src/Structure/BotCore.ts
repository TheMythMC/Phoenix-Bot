import { Client, Collection, Guild, PermissionResolvable, User } from 'discord.js';
import { sendErrorMessage } from '../utils/MessageUtils';
import Util from '../utils/Util';
import path from 'path';
import GuildData, { createDefault } from '../Schemas/GuildData';
import tempConfig from '../../config.json';
import RoleSync from '../modules/RoleSync/RoleSync';
import Bot from '../Bot';
import Command from './Command';
import { Manager } from 'erela.js';
import Spotify from 'erela.js-spotify';

import UserData, { createDefault as createUser } from '../Schemas/UserData';

export default class BotCore extends Client {
  commands: Map<string, Command>;
  aliases: Map<string, string>;
  Bot: Bot;
  defaultPrefix: string;
  manager: Manager;
  config: Config;
  constructor(bot: Bot, options = {} as IBotCore) {
    super({
      disableMentions: 'everyone',
    });

    this.validate(options);

    this.commands = new Collection();

    this.config = tempConfig as Config;

    this.aliases = new Collection();

    this.Bot = bot;

    this.defaultPrefix = options.defaultPrefix || '!';

    this.on('guildCreate', this.registerGuild);

    this.on('guildMemberAdd', this.syncGuildMember);

    this.once('ready', () => {
      console.log(`Logged in as ${this.user.tag}!`);
      // So music works
      this.manager.init(this.user.id);
    });

    this.on('message', async (message) => {
      if (message.channel.type === 'dm') return;
      let prefix = await this.Bot.getPrefix(message.guild);

      if (!message.guild || message.author.bot) return;

      if (!message.content.startsWith(prefix)) return;

      //eslint-disable-next-line no-unused-vars
      const [cmd, ...args] = message.content.slice(prefix.length).trim().split(/ +/g);
      const command = this.commands.get(cmd.toLowerCase()) || this.commands.get(this.aliases.get(cmd.toLowerCase()));

      if (command) {
        if (command.requireBotOwner && !this.config.BotOwners.includes(message.member.id))
          return sendErrorMessage(message.channel, 'Only the bot owners can execute this command!');
        if (command.requiredPerms) {
          let isAllowed = true;
          command.requiredPerms.forEach((perm: PermissionResolvable) => {
            if (!message.member.hasPermission(perm)) isAllowed = false;
          });
          if (!isAllowed) return sendErrorMessage(message.channel, 'You are not a high enough role to use this.');
        }
        if (command.isPremium && !(await this.Bot.GuildManager.isPremium(message.guild.id)))
          return sendErrorMessage(message.channel, 'This command is premium. ');
        this.registerGuild(message.guild);
        this.registerUser(message.author);
        // noinspection ES6MissingAwait
        command.run(message, args, this);
      }
    });

    // Music stuff

    this.manager = new Manager({
      plugins: [
        new Spotify({
          clientID: process.env.SPOTIFY_ID,
          clientSecret: process.env.SPOTIFY_SECRET
        })
      ],
      nodes: [
        {
          host: 'lavalink',
          password: '#BuyPhoenix2021',
          port: 2333,
        },
      ],

      send: (id, payload) => {
        const guild = this.guilds.cache.get(id);

        if (guild) guild.shard.send(payload);
      },
    });

    // Emitted whenever a node connects
    this.manager.on('nodeConnect', (node) => {
      console.log(`Node "${node.options.identifier}" connected.`);
    });

    this.on('raw', (d) => this.manager.updateVoiceState(d));

    // Emitted whenever a node encountered an error
    this.manager.on('nodeError', (node, error) => {
      console.log(`Node "${node.options.identifier}" encountered an error: ${error.message}.`);
    });
  }
  // Back to Discord stuff

  validate(options) {
    if (typeof options !== 'object') throw new TypeError('Options must be type of object');

    if (!options.token) throw new Error('You must provide a token for the client');
    this.token = options.token;
  }

  async start(token = this.token) {
    await Util.loadCommands(this, `Commands${path.sep}CoreCommands`);
    await Util.loadCommands(this, `Commands${path.sep}PremiumCommands`);
    await super.login(token);
  }

  async registerGuild(guild: Guild) {
    if (await GuildData.exists({ ServerID: guild.id })) return;
    let doc = createDefault(guild.id, this.defaultPrefix);
    doc.save();

    this.Bot.GuildManager.addGuild(doc);
  }

  async registerUser(user: User) {
    if (await UserData.exists({ UserID: user.id })) return;
    let doc = createUser(user.id);
    doc.save();
  }

  async syncGuildMember(member) {
    const d = await this.Bot.LinkManager.getDataByDiscord(member.id);
    if (d) {
      try {
        RoleSync(member, d.MinecraftUUID, (await this.Bot.GuildManager.getGuild(member.guild.id))?.data.RoleLinks);
      } catch (err) {}
    }
  }
}

interface IBotCore {
  token: string;
  defaultPrefix: string;
}

interface Config {
  UUIDUsernameAPICache: boolean;
  UUIDUsernameAPICacheTime: number;
  BotOwners: string[];
}
