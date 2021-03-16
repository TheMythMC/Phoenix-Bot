const express = require("express"); 

class Server {
    constructor(bot, port) {
        this.app = express(); 
        require('express-ws')(this.app); 
        this.port = port; 
        this.Bot = bot; 
        this.addMiddleware(); 

        this.app.listen(this.port); 
    }

    addMiddleware() {
        this.addRouters(); 
    }

    addRouters() {
        this.app.use("/live", require("./routers/live")); 
    }
}

module.exports = Server; 