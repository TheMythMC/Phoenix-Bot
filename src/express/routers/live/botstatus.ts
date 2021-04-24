import express from 'express';
import Bot from '../../../Bot';
import PremiumUtils from '../../../utils/PremiumUtils';
import Util from '../../../utils/Util';
import expressWs from 'express-ws';
const router = express.Router() as expressWs.Router;

router.ws('/', async (ws, req) => {
  if (
    req.query.guildID &&
    (await Util.isSessionPermitted(
      req.cookies.session_id,
      req.query.guildID,
      Bot.instance
    ))
  ) {
    ws.send(
      JSON.stringify({
        status:
          PremiumUtils.getMinecraftBotFromGuild(req.query.guildID)?.status ||
          false,
      })
    );
    Bot.instance.EventEmitter.addListener('botStatusChanged', changeStatus);
    Bot.instance.EventEmitter.addListener('botJoinFailed', error);
  } else {
    ws.close();
  }

  ws.on('close', () => {
    Bot.instance.EventEmitter.removeListener('botStatusChanged', changeStatus);
    Bot.instance.EventEmitter.removeListener('botJoinFailed', error);
  });

  function changeStatus(guildID, status) {
    if (req.query.guildID != guildID) return;
    ws.send(JSON.stringify({ status: status }));
  }

  function error(guildID, err) {
    if (req.query.guildID != guildID) return;
    ws.send(JSON.stringify({ error: err }));
  }
});

module.exports = router;
