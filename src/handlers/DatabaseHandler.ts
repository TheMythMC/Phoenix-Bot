import mongoose from 'mongoose';

export default class DatabaseHandler {
    connected: boolean;
    connection: any;
    constructor(databaseURI, parameters = {}, callback = () => {}) {
        this._initConnection(databaseURI, parameters, callback);
        this.connected = false;
    }

    _initConnection(databaseURI, parameters, callback) {
        mongoose.connect(databaseURI, parameters);

        this.connection = mongoose.connection;

        let self = this;

        this.connection.once('open', () => {
            self.connected = true;
            callback();
        });
    }
}