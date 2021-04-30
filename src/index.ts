import readline from 'readline';
import dotenv from 'dotenv';
import Bot from './Bot';
import PremiumUtils from './utils/PremiumUtils';

// Load ENV file into `process.env`
dotenv.config();

// Initialize needed Bots
new Bot();

// Look for stop || exit || halt to shutdown Bot
readline
  .createInterface({
    input: process.stdin,
    output: process.stdout,
  })
  .question('', (string: string) => {
    if (
      string.toLowerCase().startsWith('stop') ||
      string.toLowerCase().startsWith('exit') ||
      string.toLowerCase().startsWith('halt')
    ) {
      console.log('Shutting down...');
      PremiumUtils.shutDown();
    }
  });
// keep process alive for docker
process.stdin.resume();
