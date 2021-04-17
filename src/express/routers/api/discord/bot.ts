import express from 'express';
const router = express.Router();

router.use('/startBot', require('./bot/startBot'));

module.exports = router;
