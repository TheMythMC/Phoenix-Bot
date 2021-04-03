import express from 'express'
const router = express.Router();
import Bot from '../../../Bot';

router.use('/', (req, res) => {
    let bot = Bot.getBot().CoreBot;
    let guilds = bot.guilds.cache.size;
    let users = bot.users.cache.size;
    let uptime = bot.uptime;
    res.json({
            botsActive: Bot.getBot().MineflayerManager.getMCBots().size,
            servers: guilds,
            users: users,
            uptime: uptime
    });
}); 
module.exports = router;
