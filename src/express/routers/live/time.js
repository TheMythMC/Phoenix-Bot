const express = require('express'); 
const router = express.Router(); 

router.ws("/", (ws, req) => {
    
    const e = setInterval(() => {
        ws.send(new Date().getTime()); 
    }, 1000); 

    ws.on('close', () => {
        clearInterval(e); 
        console.log("CLOSING..."); 
    }); 
}); 

module.exports = router; 