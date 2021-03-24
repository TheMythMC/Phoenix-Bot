package xyz.projectphoenix.music;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;


public class DatabaseHelper {
    private final MongoClient mongoClient;

    public DatabaseHelper() {
        mongoClient = MongoClients.create(Config.get("DB_URI"));
        mongoClient.close();
    }
    
}
