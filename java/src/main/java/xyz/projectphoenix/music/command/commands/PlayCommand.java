package xyz.projectphoenix.music.command.commands;

import net.dv8tion.jda.api.entities.GuildVoiceState;
import net.dv8tion.jda.api.entities.Member;
import net.dv8tion.jda.api.entities.TextChannel;
import xyz.projectphoenix.music.Util;
import xyz.projectphoenix.music.command.CommandContext;
import xyz.projectphoenix.music.command.ICommand;
import xyz.projectphoenix.music.lavaplayer.PlayerManager;

import java.util.Objects;

public class PlayCommand implements ICommand {
    public static boolean isSearch = false;
    @Override
    public void handle(CommandContext ctx) {
        final TextChannel channel = ctx.getChannel();

        if(ctx.getArgs().isEmpty()) {
            channel.sendMessage("You must specify a link/title").queue();
            return;
        }

        final Member selfMember = ctx.getSelfMember();
        final GuildVoiceState selfVoiceState = selfMember.getVoiceState();


        final Member member = ctx.getMember();
        final GuildVoiceState memberVoiceState = member.getVoiceState();

        assert memberVoiceState != null;
        if(!memberVoiceState.inVoiceChannel()) {
            channel.sendMessage("You need to be in a voice channel for this command to work").queue();
            return;
        }

        if(!Objects.equals(memberVoiceState.getChannel(), selfVoiceState.getChannel())) {
            channel.sendMessage("You need to be in the same voice channel as me for this to work").queue();
            return;
        }

        String link = String.join(" ", ctx.getArgs());
        if(!Util.isURL(link)) {

            link = "ytsearch:" + link;
            isSearch = true;

        }
        System.out.println(link);
        PlayerManager.getInstance().loadAndPlay(channel, link);
    }

    @Override
    public String getName() {
        return "play";
    }


}
