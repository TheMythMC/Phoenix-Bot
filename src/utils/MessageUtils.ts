import { TextChannel } from "discord.js";

const { MessageEmbed } = require("discord.js");

export default class Utils {
    static sendErrorMessage(channel, error) {
        return channel.send(Utils.createErrorMessage(error)); 
    }

    static sendSuccessMessage(channel: TextChannel, message: String) {
        return channel.send(Utils.createSuccessMessage(message)); 
    }

    static createSuccessMessage(message) {
        return Utils.createCustomEmbed("GREEN", message, "Success!", undefined)
    }

    static createErrorMessage(error) {
        return Utils.createCustomEmbed("RED", error, "Error", undefined); 
    }

    static sendCustomMessage(channel: TextChannel, color, message, title, footer, ...sections) {
        return channel.send(Utils.createCustomEmbed(color, message, title, footer, ...sections));
    }

    static createCustomEmbed(color: String, message: String, title: String, footer: String, ...sections) {
        let embed = new MessageEmbed(); 

        embed
            .setColor(color)
            .setDescription(message)
            .setTitle(title)
            .setFooter(`Phoenix Bot coded by Project Phoenix ${footer || ""}`, 'https://i.ibb.co/m9RR0QG/Phoenix.png')
            .setTimestamp();
        if(sections !== undefined && sections.length != 0) {
            for (let i = 0; i < sections.length; i++) {
                if (!sections[i] || !sections[i].name || !sections[i].value) continue; 
                embed.addField(sections[i].name, sections[i].value);
            }
        }
        return embed; 
    }
}
