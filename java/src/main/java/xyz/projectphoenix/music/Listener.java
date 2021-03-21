package xyz.projectphoenix.music;

import me.duncte123.botcommons.BotCommons;
import net.dv8tion.jda.api.entities.User;
import net.dv8tion.jda.api.events.ReadyEvent;
import net.dv8tion.jda.api.events.message.guild.GuildMessageReceivedEvent;
import net.dv8tion.jda.api.hooks.ListenerAdapter;
import org.jetbrains.annotations.NotNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class Listener extends ListenerAdapter {
    private final CommandManager manager = new CommandManager();

    private static final Logger LOGGER = LoggerFactory.getLogger(Listener.class);
    @Override
    public void onReady(@NotNull ReadyEvent event) {
        LOGGER.info("{} is ready.", event.getJDA().getSelfUser().getAsTag());
        System.out.println("hi?");
    }



    @Override
    public void onGuildMessageReceived(@NotNull GuildMessageReceivedEvent event) {
        User user = event.getAuthor();
        if(user.isBot() || event.isWebhookMessage()) return;

        final long guildID = event.getGuild().getIdLong();
        String prefix = Config.get("prefix");
        String raw = event.getMessage().getContentRaw();

        if(raw.equalsIgnoreCase(prefix + "shutdown") && event.getAuthor().getId() == Config.get("OWNER_ID")) {
            LOGGER.info("Shutting down...");
            event.getJDA().shutdown();
            BotCommons.shutdown(event.getJDA());

            return;
        }

        if(raw.startsWith(prefix)) {
            manager.handle(event);
        }
    }
}
