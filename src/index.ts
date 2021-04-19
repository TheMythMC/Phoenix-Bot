import readline from 'readline';
import dotenv from 'dotenv';
import Bot from './Bot';

//Load ENV file
dotenv.config();


//Initialize Needed Bots
let bot = new Bot();


// stop method
readline.createInterface({
    input: process.stdin,
	output: process.stdout
}).question('', (data) => {
	if (data.toLowerCase().startsWith('stop')){ 
        console.log('Shutting down...');
        bot.CoreBot.destroy();
        process.exit(0);
    }
});

// keep process alive for docker
process.stdin.resume();
