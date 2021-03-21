package xyz.projectphoenix.music;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;

public class DatabaseHelper {
    public static void load(){
        MongoClient mongoClient = MongoClients.create(Config.get("DB_URI"));
    }
}
