import express from 'express';
const router = express.Router(); 

router.use('/oauth', require('./api/oauth')); 
router.use('/discord', require('./api/discord')); 
router.use('/stats', require('./api/stats'));

module.exports = router;
