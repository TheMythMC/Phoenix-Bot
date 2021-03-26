import express from 'express'
const router = express.Router();
const Bot = require('../../../Bot');

router.use('/', (req, res) => {
    let bot = Bot.getBot().CoreBot;
    let guilds = bot.guilds.cache.size;
    let users = bot.users.cache.size;
    let uptime = bot.uptime;
    res.json({
            botsActive: 0,
            servers: guilds,
            users: users,
            uptime: uptime
    });
}); 
module.exports = router;
