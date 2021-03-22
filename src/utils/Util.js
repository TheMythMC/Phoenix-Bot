const Command = require("../Structure/Command");
const path = require("path");
const glob = require("glob");
const pathParse = require('path-parse');
const crypto = require('crypto'); 

class Util {
    static isClass(input) {
        return typeof input === 'function' &&
            typeof input.prototype === 'object' &&
            input.toString().substring(0, 5) === 'class';
    }
    static get directory() {
        return `${path.dirname(require.main.filename)}${path.sep}`;
    }

    static async loadCommands(client, path) {
        return glob(`${this.directory}${path}/**/*.js`, {}, (err, commands) => {
            for(const commandFile of commands) {
                // TODO: why does path.parse not work :(
                delete require.cache[commandFile];
                const { name } = pathParse(commandFile);
                const File = require(commandFile);
                if(!this.isClass(File)) throw new TypeError(`The command ${name} does not export a class.`);
                const command = new File(client, name.toLowerCase());
                if(!(command instanceof Command)) throw new TypeError(`The command ${name} doesn't belong in Commands.`);
                client.commands.set(command.name, command);
                console.log(`Set ${command.name} as a command`);
                if(command.aliases.length) {
                    for(const alias of command.aliases) {
                        client.aliases.set(alias, command.name);
                    }
                }
            }
        });
    }
    static formatNumber(number) {
        return number.toLocaleString('en-US', {maximumFractionDigits:2});
    }
    static removeDuplicates(arr) {
        return [...new Set(arr)];
    }
    static capitalize(string) {
        return string.split(' '.localeCompare(str => str.slice(0, 1).toUpperCase() + str.slice(1)).join(' '));
    }

    static genRandomKey(bytes = 16) {
        return crypto.randomBytes(bytes).toString("hex"); 
    }
}

module.exports = Util;