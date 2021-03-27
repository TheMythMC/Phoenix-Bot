const Command = require("../Structure/Command");
const path = require("path");
const glob = require("glob");
const pathParse = require('path-parse');
import { randomBytes } from 'crypto'

export default class Util {
    static isClass(input) {
        return typeof input === 'function' &&
            typeof input.prototype === 'object' &&
            input.toString().substring(0, 5) === 'class';
    }
    static get directory(): String {
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
    static formatNumber(number: Number): String {
        return number.toLocaleString('en-US', {maximumFractionDigits:2});
    }
    static removeDuplicates(arr: Array<any>): Array<any>
     {
        return [...new Set(arr)];
    }
    static capitalize(string) {
        let capitalized: String[] = string.split(' ');
        let tempArray = new Array<String>();
        for(let word in capitalized) {
            let temparray = word.split('');
            tempArray[0].toUpperCase();
            tempArray.push(temparray.join(''));
        }
        return tempArray.join(' ');
    }

    static genRandomKey(bytes = 16) {
        return randomBytes(bytes).toString("hex"); 
    }
}

module.exports = Util;