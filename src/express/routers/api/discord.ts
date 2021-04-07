import express from "express";
import Bot from "../../../Bot";
const router = express.Router();
import DiscordOAuthData from "../../../Schemas/DiscordOAuthData";
import Util from "../../../utils/Util";

router.use(async (req, res, next) => {
  // this will be where api keys will be tested if they're expired, and if so, refresh

  if (!req.cookies.session_id) return res.status(401).end();

  let d = await DiscordOAuthData.findOne({ SessionID: req.cookies.session_id });

  // invalid session id, lock out :D
  if (!d) return res.status(401).end();
  // valid session id!!!

  const response = await fetch("http://discordapp.com/api/users/@me", {
    headers: {
      Authorization: `Bearer ${d.AccessToken}`,
    },
  });

  if (response.status === 401) {
    let e = await fetch(
      `${req.protocol}://${req.get("host")}/api/oauth/refresh?token=${d.RefreshToken}&session_id=${d.SessionID}`
    );
    if (e.status === 400) return res.status(440).end();
  }

  next();
});

router.get("/guilds", async (req, res) => {
  let token = await Util.getAccessToken(req.cookies.session_id);
  const response = await fetch("http://discordapp.com/api/users/@me/guilds", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  let d = await response.json();

  for (let guild of d) {
    guild.isBotInGuild = Bot.instance.CoreBot.guilds.cache.has(guild.id);
  }

  res.status(response.status).send(d);
});

router.get("/user", async (req, res) => {
  let d = await DiscordOAuthData.findOne({ SessionID: req.cookies.session_id });
  const response = await fetch("http://discordapp.com/api/users/@me", {
    headers: {
      Authorization: `Bearer ${d.AccessToken}`,
    },
  });

  res.status(response.status);
  res.send(await response.json());
});

module.exports = router;
