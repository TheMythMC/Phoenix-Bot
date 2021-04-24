import readline from 'readline';
import dotenv from 'dotenv';
import Bot from './Bot';

// Load ENV file into `process.env`
dotenv.config();

// Initialize needed Bots
let bot = new Bot();

// Look for stop to shutdown Bot
readline
  .createInterface({
    input: process.stdin,
    output: process.stdout,
  })
  .question('', (string: string) => {
    if (string.toLowerCase().startsWith('stop')) {
      console.log('Shutting down...');
      bot.CoreBot.destroy();
      process.exit(0);
    }
  });
// keep process alive for docker
process.stdin.resume();
