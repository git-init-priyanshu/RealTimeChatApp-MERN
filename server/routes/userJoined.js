const express = require("express");
const router = express.Router();
const Message = require("../models/Messages");

// Route: Join chat using: POST "/api/msg/join"
router.post("/join", async (req, res) => {
  console.log(req.body);
  try {
    const { name, msg, position } = req.body;
    await Message.create({
      name: name,
      msg: msg,
      positon: position,
    });
  } catch (error) {
    res.status(400).json({ error: error });
  }
  return res.json(req.body);
});

// Route2: Send msg using: POST "/api/msg/send"
router.post("/send", (req, res) => {
  res.json(req.body);
});

// Route3: Receive msg using: POST "/api/msg/receive"
router.post("/receive", (req, res) => {
  res.json(req.body);
});

module.exports = router;
