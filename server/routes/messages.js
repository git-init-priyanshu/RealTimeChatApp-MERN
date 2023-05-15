const express = require("express");
const router = express.Router();
const Message = require("../models/Messages");

// Route1: Add user using: POST "/api/adduser"
router.route("/adduser", (req, res) => {
  res.json(req.body);
});
