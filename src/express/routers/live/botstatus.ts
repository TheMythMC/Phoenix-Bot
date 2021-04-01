import express from "express";
import Bot from "../../../Bot";
const router = express.Router();

router.ws("/", (ws, req) => {
  ws.on("open", () => {
    Bot.bot.EventEmmiter.addListener("botStatusChanged", changeStatus);
    Bot.bot.EventEmmiter.addListener("botJoinFailed", error);
  });

  ws.on("close", () => {
    Bot.bot.EventEmmiter.removeListener("botStatusChanged", changeStatus);
    Bot.bot.EventEmmiter.removeListener("botJoinFailed", error);
  });

  function changeStatus(status) {
    ws.send({ status: status });
  }

  function error(err) {
    ws.send({ error: err });
  }
});

module.exports = router;
