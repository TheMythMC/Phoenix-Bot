const child_process = require('child_process');
const path = require('path');
const { stderr } = require('process');

module.exports = class MusicBot {
    constructor() {
        child_process.exec('python musicBot.py', (err, stdout, stderr) => {
            console.log(stdout)
        });
    }
}
