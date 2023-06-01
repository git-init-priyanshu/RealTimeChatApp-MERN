const express = require("express");
const router = express.Router();
const Messages = require("../models/Messages");

router.get("/fetchdata", async (req, res) => {
  const data = await Messages.find();
  res.json(data);
});

module.exports = router;
