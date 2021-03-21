package xyz.projectphoenix.music.command;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

public interface ICommand {
    void handle(CommandContext ctx);

    String getName();

    default List<String> getAliases() {
        return Collections.emptyList();
    }
}
