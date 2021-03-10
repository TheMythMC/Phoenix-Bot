const { MessageEmbed } = require("discord.js");

class Utils {
    static sendErrorMessage(channel, error) {
        Utils.sendCustomMessage(channel, "RED", error, "Error"); 
    }

    static sendSuccessMessage(channel, message) {
        Utils.sendCustomMessage(channel, "GREEN", message, "Success!"); 
    }

    static sendCustomMessage(channel, color, message, title, ...sections) {
        let embed = new MessageEmbed()

        embed
            .setColor(color)
            .setDescription(message)
            .setTitle(title)
            .setFooter('Phoenix Bot coded by Project Phoenix', 'https://i.ibb.co/m9RR0QG/Phoenix.png')
            .setTimestamp();
        if(!sections.size == 0
        || !sections == null) {
            for (let i = 0; (i < sections -1); i =+ 2) {
                embed.addField(sections[i], sections[(i+1)]);
            }
        }
        channel.send(embed);
    }
}

module.exports = Utils;