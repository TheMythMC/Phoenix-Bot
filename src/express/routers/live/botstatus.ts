import express from "express";
import Bot from "../../../Bot";
import Util from "../../../utils/Util";
const router = express.Router();

router.ws("/", (ws, req) => {
  if (req.query.guildID) {
    Bot.bot.EventEmmiter.addListener(`botStatusChanged-${req.query.guildID}`, changeStatus);
    Bot.bot.EventEmmiter.addListener(`botJoinFailed${req.query.guildID}`, error);
  }

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
