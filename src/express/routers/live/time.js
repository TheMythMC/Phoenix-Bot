const express = require('express'); 
const router = express.Router(); 

router.ws("/", (ws, req) => {
    
    const e = setInterval(() => {
        ws.send(Date.now()); 
    }, 1000); 

    ws.on('close', () => {
        clearInterval(e); 
    }); 
}); 

module.exports = router; 