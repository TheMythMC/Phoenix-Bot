require("dotenv").config();

const Bot = require("./Bot");
const MusicBot = require('./MusicBot')

//Initialize Needed Bots(s)
//new Bot();
new MusicBot();
// keep process alive for docker
process.stdin.resume();

