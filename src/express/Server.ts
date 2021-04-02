import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import expressWs from "express-ws";

export default class Server {
  app: any;
  port: any;
  Bot: any;
  constructor(bot, port) {
    this.app = express();
    expressWs(this.app);
    this.port = port;
    this.Bot = bot;
    this.addMiddleware();

    this.app.listen(this.port);
  }

  addMiddleware() {
    this.app.use(express.json());
    this.app.use(express.urlencoded());
    this.app.use(
      cors({
        origin: "http://localhost:3000", // CORS policy
        credentials: true,
      })
    );
    this.app.use(cookieParser());
    this.addRouters();
  }

  addRouters() {
    this.app.use("/live", require("./routers/live"));
    this.app.use("/api", require("./routers/api"));
  }
}
