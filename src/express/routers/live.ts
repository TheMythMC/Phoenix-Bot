import express from 'express';
const router = express.Router();

const time = require('./live/time');

// live endpoints: for cool things such as websockets

router.use('/time', time);
router.use('/botstatus', require('./live/botstatus'));

module.exports = router;
