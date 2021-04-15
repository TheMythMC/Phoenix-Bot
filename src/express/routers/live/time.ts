import express from 'express';
import expressWs from 'express-ws';
const router = express.Router() as expressWs.router;

router.ws('/', (ws, req) => {
  let e = setInterval(() => {
    ws.send(Date.now());
  }, 1000);

  ws.on('close', () => {
    clearInterval(e);
  });
});

module.exports = router;
