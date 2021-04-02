import express from "express";
import expressWs from "express-ws";
const router = express.Router() as expressWs.router;

router.ws("/", (ws, req) => {
  console.log(req.cookies);

  let e;
  ws.on("open", () => {
    console.log("Opened");

    e = setInterval(() => {
      console.log(Date.now());

      ws.send(Date.now());
    }, 1000);
  });

  ws.on("message", (msg) => {
    console.log(msg);
  });

  ws.on("close", () => {
    console.log("CLOSED");

    clearInterval(e);
  });
});

module.exports = router;
