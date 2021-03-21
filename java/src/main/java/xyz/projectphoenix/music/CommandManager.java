package xyz.projectphoenix.music;


import com.jagrosh.jdautilities.command.Command;
import net.dv8tion.jda.api.events.message.guild.GuildMessageReceivedEvent;
import xyz.projectphoenix.music.command.CommandContext;
import xyz.projectphoenix.music.command.ICommand;
import xyz.projectphoenix.music.command.commands.JoinCommand;
import xyz.projectphoenix.music.command.commands.PlayCommand;
import xyz.projectphoenix.music.command.commands.SkipCommand;
import xyz.projectphoenix.music.command.commands.StopCommand;

import javax.annotation.Nullable;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.regex.Pattern;

public class CommandManager {
    private final List<ICommand> commands = new ArrayList<>();

    public CommandManager() {
        addCommand(new JoinCommand());
        addCommand(new PlayCommand());
        addCommand(new StopCommand());
        addCommand(new SkipCommand());
    }

    private void addCommand(ICommand cmd) {
        boolean nameFound = this.commands.stream().anyMatch(i -> i.getName().equalsIgnoreCase(cmd.getName()));
        
        if(nameFound) {
            throw new IllegalArgumentException("A command with this name is already present");
        }
        
        commands.add(cmd);
    }
    @Nullable
    private ICommand getCommand(String search) {
        String searchLower = search.toLowerCase();

        for (ICommand cmd : this.commands) {
            if(cmd.getName().equals(searchLower) || cmd.getAliases().contains(searchLower)) {
                return  cmd;
            }
        }
        return null;
    }

    void handle(GuildMessageReceivedEvent event) {
        String[] split = event.getMessage().getContentRaw()
                .replaceFirst("(?i)" + Pattern.quote(Config.get("prefix")), "")
                .split("\\s+");
        String invoke = split[0].toLowerCase();
        ICommand cmd = this.getCommand(invoke);

        if(cmd != null) {
            event.getChannel().sendTyping().queue();
            List<String> args = Arrays.asList(split).subList(1, split.length);

            CommandContext ctx = new CommandContext(event, args);

            cmd.handle(ctx);
        }
    }
}
