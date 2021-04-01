import { MessageEmbed } from "discord.js";

    export function sendErrorMessage(channel, error: string) {
        return channel.send(createErrorMessage(error)); 
    }

    export function sendSuccessMessage(channel, message: string) {
        return channel.send(createSuccessMessage(message));
    }

    export function createSuccessMessage(message: string) {
        return createCustomEmbed("GREEN", message, "Success!", undefined)
    }

    export function createErrorMessage(error: string) {
        return createCustomEmbed("RED", error, "Error", undefined);
    }

    export function sendCustomMessage(channel, color: string, message: string, title: string, footer: string, ...sections: string[]) {
        return channel.send(createCustomEmbed(color, message, title, footer, ...sections));
    }

    export function createCustomEmbed(color: string, message: string, title: string, footer: string, ...sections: string[]) {
        let embed = new MessageEmbed(); 

        embed
            .setColor(color)
            .setDescription(message)
            .setTitle(title)
            .setFooter(`Phoenix Bot coded by Project Phoenix ${footer || ""}`, 'https://i.ibb.co/m9RR0QG/Phoenix.png')
            .setTimestamp();
        if(sections !== undefined && sections.length != 0) {
            for (let i = 0; i < sections.length; i += 2) {
                if (!sections[i] || !sections[i+2]) continue;
                embed.addField(sections[i], sections[i+1]);
            }
        }
        return embed; 
    }
