import express from 'express'
const router = express.Router(); 
const jwt = require('jsonwebtoken'); 
const { genRandomKey } = require('../../../utils/Util'); 
const fetch = require('node-fetch'); 
const qs = require("querystring"); 

const url = encodeURIComponent(`http://localhost:4000/api/oauth/auth`); 

router.get('/getlink', (req, res) => {

    console.log(req.body); 

    const sessionId = genRandomKey(); 

    let state = jwt.sign({
        redirect_uri: req.query.redirect_uri, 
        session_id: sessionId
    }, process.env.CLIENT_SECRET); 

    res.cookie("session_id", sessionId, {expires: new Date(60000 * 60 * 24 + Date.now())}); 

    res.status(200).send(`https://discordapp.com/api/oauth2/authorize?client_id=${process.env.CLIENT_ID}&scope=${req.query.scope}&redirect_uri=${url}&state=${state}&response_type=code`); 
}); 

router.get('/auth', async (req, res) => {
    const state = req.query.state; 
    console.log(req.query.code);
    
    let decrypted = jwt.verify(state, process.env.CLIENT_SECRET); 
    
    const response = await fetch(`https://discordapp.com/api/oauth2/token`,
    {
      method: 'POST',
      headers: {
		'Content-Type': 'application/x-www-form-urlencoded'
      },
	  body: qs.stringify({
		grant_type: 'authorization_code', 
		code: req.query.code, 
		redirect_uri: decodeURIComponent(url), 
        client_id: process.env.CLIENT_ID, 
        client_secret: process.env.CLIENT_SECRET
	  })
    });

    let json = await response.json(); 

    res.redirect(decrypted.redirect_uri); 
});

router.get('/isValidAuthCode', (req, res) => {
    // A valid auth code must be in the database and not be expired
    

})



module.exports = router; 