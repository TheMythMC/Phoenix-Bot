import { MessageEmbed } from "discord.js";

    export function sendErrorMessage(channel, error) {
        return channel.send(createErrorMessage(error)); 
    }

    export function sendSuccessMessage(channel, message) {
        return channel.send(createSuccessMessage(message));
    }

    export function createSuccessMessage(message) {
        return createCustomEmbed("GREEN", message, "Success!", undefined)
    }

    export function createErrorMessage(error) {
        return createCustomEmbed("RED", error, "Error", undefined);
    }

    export function sendCustomMessage(channel, color, message, title, footer, ...sections) {
        return channel.send(createCustomEmbed(color, message, title, footer, ...sections));
    }

    export function createCustomEmbed(color, message, title, footer, ...sections) {
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