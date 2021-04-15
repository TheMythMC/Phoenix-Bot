require('dotenv').config();

import Bot from './Bot';

//Initialize Needed Bots
new Bot();
// keep process alive for docker
process.stdin.resume();

