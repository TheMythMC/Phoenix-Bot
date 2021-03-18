const express = require('express'); 
const router = express.Router(); 

router.use((req, res, next) => {
    // this will be where api keys will be tested if they're expired, and if so, refresh

    next(); 
}); 

module.exports = router; 