const express = require('express'); 
const router = express.Router(); 


const time = require("./live/time"); 

// live endpoints: for cool things such as websockets

router.use('/time', time); 

module.exports = router; 