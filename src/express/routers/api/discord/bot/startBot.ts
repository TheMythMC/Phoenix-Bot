import express from 'express';
import Bot from '../../../../../Bot';
import GuildData from '../../../../../Schemas/GuildData';
import Util from '../../../../../utils/Util';
const router = express.Router();

router.post('/', async (req, res) => {
  // check if permitted

  const GUILDID =
    typeof req.query.guildID === 'string' ? req.query.guildID : undefined;

  if (
    !req.query.guildID ||
    !(await Util.isSessionPermitted(
      req.cookies.sessionID,
      GUILDID,
      Bot.instance
    ))
  )
    return res.status(401).end();

  // NOTE: this endpoint will NOT gurantee that the bot will successfully start, rather it will make the bot attempt to start
  const guildPData = await GuildData.findOne({
    ServerID: GUILDID,
  }).exec();

  if (!guildPData) return res.status(404).end();

  Bot.instance.MineflayerManager.startBot(guildPData);
});

module.exports = router;
