import readline from 'readline';
require('dotenv').config();

import Bot from './Bot';

//Initialize Needed Bots
let bot = new Bot();

let rl = readline.createInterface({
    input: process.stdin,
	output: process.stdout
});

rl.question('', (data) => {
	if (data.toLowerCase() === 'stop'){ 
        console.log('Shutting down');
        bot.CoreBot.destroy();
        process.exit(0);
    }
});

// keep process alive for docker
process.stdin.resume();

