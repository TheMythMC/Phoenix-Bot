require("dotenv").config();

const Bot = require('./Bot')

new Bot();
// keep process alive for docker
process.stdin.resume();