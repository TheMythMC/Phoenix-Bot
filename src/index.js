require("dotenv").config();

const Bot = require("./Bot");

//Initialize Needed Bots
new Bot();
// keep process alive for docker
process.stdin.resume();

