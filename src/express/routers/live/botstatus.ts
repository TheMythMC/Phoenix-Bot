import express from "express";
import Bot from "../../../Bot";
const router = express.Router();

router.ws("/", (ws, req) => {
  if (req.query.guildID) {
    Bot.bot.EventEmmiter.addListener("botStatusChanged", changeStatus);
    Bot.bot.EventEmmiter.addListener("botJoinFailed", error);
  }

  ws.on("close", () => {
    Bot.bot.EventEmmiter.removeListener("botStatusChanged", changeStatus);
    Bot.bot.EventEmmiter.removeListener("botJoinFailed", error);
  });

  function changeStatus(guildID, status) {
    if (req.query.guildID != guildID) return;
    ws.send({ status: status });
  }

  function error(guildID, err) {
    if (req.query.guildID != guildID) return;
    ws.send({ error: err });
  }
});

module.exports = router;
