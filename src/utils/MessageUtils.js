let { MessageEmbed } = require("discord.js");

class Utils {
    static sendErrorMessage(channel, error) {
        let embed = new MessageEmbed();

        embed
            .setColor("RED")
            .setTitle('Error')
            .setDescription(error);
        channel.send(embed);
    }

    static sendSuccessMessage(channel, message) {
        let embed = new MessageEmbed();

        embed
            .setColor("GREEN")
            .setTitle("Success!")
            .setDescription(message);
        channel.send(embed);
    }

    static sendCustomMessage(channel, color, message) {
        let embed = new MessageEmbed();

        embed
            .setColor(color)
            .setDescription(message);
        channel.send(embed);
    }
}

module.exports = Utils;