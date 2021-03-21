package xyz.projectphoenix.music;

import net.dv8tion.jda.api.JDABuilder;
import net.dv8tion.jda.api.requests.GatewayIntent;
import net.dv8tion.jda.api.utils.cache.CacheFlag;

import javax.security.auth.login.LoginException;


public class Bot {
    private Bot() throws LoginException {

        JDABuilder.createDefault("ODEzNDI2Mzk5NjcwMzA0NzY4.YDPIXg.6EFpP5sl8wqq7tajzrduiOwZwy8",
                GatewayIntent.GUILD_VOICE_STATES,
                GatewayIntent.GUILD_MESSAGES)

                .enableCache(CacheFlag.VOICE_STATE)
                .addEventListeners(new Listener()).build();
    }
    public static void main(String[] args) throws LoginException {
        new Bot();
    }
}
