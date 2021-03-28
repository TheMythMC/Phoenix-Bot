require("dotenv").config();

import Bot from './Bot';

new Bot();
// keep process alive for docker
process.stdin.resume();