const express = require('express'); 
const router = express.Router(); 

router.use('/oauth', require("./api/oauth")); 
router.use('/discord', require("./api/discord")); 

module.exports = router; 