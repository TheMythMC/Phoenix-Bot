const express = require('express'); 
const router = express.Router(); 
const DiscordOAuthData = require("../../../Schemas/DiscordOAuthData"); 

router.use(async (req, res, next) => {
    // this will be where api keys will be tested if they're expired, and if so, refresh

    if (!req.cookies.session_id) return res.status(401).end(); 

    let d = await DiscordOAuthData.Model.findOne({ SessionID: req.cookies.session_id }); 

    // invalid session id, lock out :D
    if (!d) return res.status(401).end(); 
    // valid session id!!!

    const response = await fetch('http://discordapp.com/api/users/@me', {
        headers: {
          Authorization: `Bearer ${d.AccessToken}`,
        }
      });

      if (response.status === 401) {
        let e = await fetch(`${req.protocol}://${req.get('host')}/api/oauth/refresh?token=${d.RefreshToken}&session_id=${d.SessionID}`);
        if (e.status === 400) return res.status(440).end(); 
      }

    next(); 
}); 

router.get('/user', async (req, res) => {
    let d = await DiscordOAuthData.Model.findOne({ SessionID: req.cookies.session_id }); 
    const response = await fetch('http://discordapp.com/api/users/@me', {
        headers: {
          Authorization: `Bearer ${d.AccessToken}`,
        }
    });

    res.status(response.status); 
    res.send(await response.json()); 
}); 

module.exports = router; 