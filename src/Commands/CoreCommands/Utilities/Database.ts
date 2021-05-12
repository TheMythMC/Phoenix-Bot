import { Message } from 'discord.js';
import BotCore from '../../../Structure/BotCore';
import Command from '../../../Structure/Command';
import GuildData from '../../../Schemas/GuildData';

module.exports = class extends Command {
  constructor(client: BotCore) {
    super(client, 'database', {
      description: 'Changes the database of the guild (this is temporary)',
      category: 'Utilities',
      usage: '%pdatabase <key>',
      aliases: ['db'],
    });
  }
  async run(message: Message, args: string[], client: BotCore): Promise<any> {
    let guild = await GuildData.findOne({ ServerID: message.guild.id });

    if (!args[0]) {
      return message.channel.send(
        'You did not select a correct key. You can choose from: PardonNewGEXPMembers \nGuildID\nPrefix\nBotUsername (Premium Only) \nBotPassword (Premium Only) \nBotAuth \n'
      );
    }

    let filter = (m: Message) =>
      m.author.id === message.author.id && /^(.+|end)$/i.test(m.content);

    switch (args[0].toLowerCase()) {
      case 'pardonnewgexpmembers':
        {
          message.channel.send(
            'You have chosen the key to edit: PardonNewGEXPMemebers. It is of type boolean, meaning that you must input either true of false. Enter exit to exit this command (Note: anything other than true inputted will be read as false)'
          );
          let selection = await message.channel.awaitMessages(filter, {
            max: 1,
          });
          if (selection.first().content === 'exit') return;
          let value = selection.first().content === 'true' ? true : false;
          guild.PardonNewGEXPMembers = value;
          await guild.save();
        }
        break;
      case 'gexpwhitelist':
        {
          message.channel.send(
            'You have chosen the key to edit: GEXPWhitelist. It is an array of strings, please seperate player names using commas. If you do not wish to continue, please enter `exit`.'
          );
          let selection = await message.channel.awaitMessages(filter, {
            max: 1,
          });
          if (selection.first().content === 'exit') return;
          let value = selection.first().content.split(',');
          guild.GEXPWhitelist = value;
          await guild.save();
        }
        break;
      case 'guildid':
        {
          message.channel.send(
            'You have chosen to edit the GuilID key. It is a string, and can be accessed via the hypixel/slothpixel api. You can use https://api.slothpixel.me/guilds/name/<Your+Guild+Name> to find your guild\'s ID. Enter `exit` to quit this operation'
          );
          let selection = await message.channel.awaitMessages(filter, {
            max: 1,
          });
          if (selection.first().content === 'exit') return;
          let value = selection.first().content.split(' ')[0];
          guild.GuildID = value;
          await guild.save();
        }
        break;
      case 'prefix':
        {
          message.channel.send(
            'You have chosen to edit your bot\'s prefix. This is a single character. Entering exit will quit this process.'
          );
          let selection = await message.channel.awaitMessages(filter, {
            max: 1,
          });
          if (selection.first().content === 'exit') return;
          guild.Prefix = selection.first().content.split('')[0];
          await guild.save();
        }
        break;
      case 'botusername':
        {
          message.channel.send(
            'You have chosen to edit your bot\'s minecraft username (This will only have an effect for premium users). It is a string, and entering exit will quit this process.'
          );
          let selection = await message.channel.awaitMessages(filter, {
            max: 1,
          });
          if (selection.first().content === 'exit') return;
          guild.BotUsername = selection.first().content.split(' ')[0];
          await guild.save();
        }
        break;
      case 'botpassword':
        {
          message.channel.send(
            'You have chosen to edit your bot\'s minecraft password (This will only have an effect for premium users). It is a string, and entering exit will quit this process.'
          );
          let selection = await message.channel.awaitMessages(filter, {
            max: 1,
          });
          if (selection.first().content === 'exit') return;
          guild.BotPassword = selection.first().content;
          await guild.save();
        }
        break;
      case 'botauth':
        {
          message.channel.send(
            'You have chosen to edit your bot\'s minecraft auth (This will only have an effect for premium users). It is either \`mojang\` or \`microsoft\`, and entering exit will quit this process.'
          );
          let selection = await message.channel.awaitMessages(filter, {
            max: 1,
          });
          if (selection.first().content === 'exit') return;
          if (selection.first().content === 'mojang' ||
              selection.first().content === 'microsoft') {
            guild.BotAuth = selection.first().content /* So typescript doesn't get mad at me */as 'mojang' | 'microsoft';
            await guild.save();
          } else {
            return message.channel.send('Please enter a correct value');
          }
        }
        break;
      default: {
        message.channel.send('You did not select a correct key. You can choose from: PardonNewGEXPMembers \nGuildID\nPrefix\nBotUsername (Premium Only) \nBotPassword (Premium Only) \nBotAuth \n');
      }
    }
  }
};
