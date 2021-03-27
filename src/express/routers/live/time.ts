import express from 'express'
const router = express.Router(); 

router.ws("/", (ws, req) => {
    
    let e; 
    ws.on('open', () => {
        e = setInterval(() => {
            ws.send(Date.now()); 
        }, 1000); 
    })
    

    ws.on('close', () => {
        clearInterval(e); 
    }); 
}); 

module.exports = router; 