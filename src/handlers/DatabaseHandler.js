const mongoose = require("mongoose");

class DatabaseHandler {
    constructor(databaseURI, parameters = {}) {
        this._initConnection(databaseURI, parameters);
        this.connected = false;
    }

    _initConnection(databaseURI, parameters) {
        mongoose.connect(databaseURI, parameters);

        this.connection = mongoose.connection;

        let self = this;

        this.connection.once('open', () => {
            self.connected = true;
            console.log("Database is connected. ");
        });
    }
}

module.exports = DatabaseHandler;