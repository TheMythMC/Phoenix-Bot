package xyz.projectphoenix.music;

import java.net.MalformedURLException;
import java.net.URL;

public class Util {
    public static boolean isURL(String link) {
        try{
            new URL(link);
            return true;
        } catch (MalformedURLException e) {
            return false;
        }
    }
}
