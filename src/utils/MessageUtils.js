const { MessageEmbed } = require("discord.js");

class Utils {
    static sendErrorMessage(channel, error) {
        return channel.send(Utils.createErrorMessage(error)); 
    }

    static sendSuccessMessage(channel, message) {
        return channel.send(Utils.createSuccessMessage(message)); 
    }

    static createSuccessMessage(message) {
        return Utils.createCustomEmbed("GREEN", message, "Success!")
    }

    static createErrorMessage(error) {
        return Utils.createCustomEmbed("RED", error, "Error"); 
    }

    static sendCustomMessage(channel, color, message, title, footer, ...sections) {
        return channel.send(Utils.createCustomEmbed(color, message, title, footer, ...sections));
    }

    static createCustomEmbed(color, message, title, footer, ...sections) {
        let embed = new MessageEmbed(); 

        embed
            .setColor(color)
            .setDescription(message)
            .setTitle(title)
            .setFooter(`Phoenix Bot coded by Project Phoenix ${footer}`, 'https://i.ibb.co/m9RR0QG/Phoenix.png')
            .setTimestamp();
        if(sections !== undefined) {
            for (let i = 0; i < sections.length; i++) {
                embed.addField(sections[i].name, sections[i].value);
            }
        }
        return embed; 
    }
}

module.exports = Utils;