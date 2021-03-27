import express from 'express'
const router = express.Router(); 
const jwt = require('jsonwebtoken'); 
const { genRandomKey } = require('../../../utils/Util'); 
const fetch = require('node-fetch'); 
const qs = require("querystring"); 
const DiscordOAuthData = require("../../../Schemas/DiscordOAuthData");


const url = encodeURIComponent(`http://localhost:4000/api/oauth/auth`);

router.get("/getlink", (req, res) => {
  const sessionId = genRandomKey();

  let state = jwt.sign(
    {
      redirect_uri: req.query.redirect_uri,
      session_id: sessionId,
    },
    process.env.CLIENT_SECRET
  );

  res.clearCookie("session_id");
  res.cookie("session_id", sessionId, { domain: `${req.hostname}` });

  res
    .status(200)
    .send(
      `https://discordapp.com/api/oauth2/authorize?client_id=${process.env.CLIENT_ID}&scope=${req.query.scope}&redirect_uri=${url}&state=${state}&response_type=code`
    );
});

router.get("/auth", async (req, res) => {
  let decrypted = jwt.verify(req.query.state, process.env.CLIENT_SECRET) || {
    session_id: req.query.session_id,
  };

  const response = await fetch(`https://discordapp.com/api/oauth2/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: qs.stringify({
      grant_type: "authorization_code",
      code: req.query.code,
      redirect_uri: decodeURIComponent(url),
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
    }),
  });

  let json = await response.json();

  DiscordOAuthData.Model.deleteMany({
    SessionID: decrypted.session_id,
  });

  let d = DiscordOAuthData.createDefault(
    decrypted.session_id,
    json.access_token,
    json.refresh_token,
    json.expires_in
  );
  await d.save();

  res.redirect(decrypted.redirect_uri);
});

router.get("/refresh", async (req, res) => {
  const response = await fetch(`https://discordapp.com/api/oauth2/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: qs.stringify({
      grant_type: "refresh_token",
      refresh_token: req.query.token,
      redirect_uri: decodeURIComponent(url),
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
    }),
  });

  let json = await response.json();

  res.status(response.status);
  res.send(json);

  if (response.status !== 200) return;

  DiscordOAuthData.Model.deleteMany({
    SessionID: req.query.session_id,
  });

  let d = DiscordOAuthData.createDefault(
    req.query.session_id,
    json.access_token,
    json.refresh_token,
    json.expires_in
  );
  await d.save();
});

router.get("/isValidSession", async (req, res) => {
  const session = req.cookies.session_id;
  if (!session) return res.status(200).json(false);
  // A valid auth code must be in the database and not be expired
  const data = await DiscordOAuthData.Model.findOne({ SessionID: session });
  if (data && Date.now() < data.ExpireTime) return res.status(200).json(true);
  return res.status(200).json(false);
});

router.post("/logout", async (req, res) => {
  const session = req.cookies.session_id;
  // TODO: finish this
  if (!session) res.status(404).end();

  const foundData = await DiscordOAuthData.Model.findOne({
    SessionID: session,
  });

  if (!foundData) res.status(404).end();

  await foundData.remove();
  res.status(200).end();
});

module.exports = router;
