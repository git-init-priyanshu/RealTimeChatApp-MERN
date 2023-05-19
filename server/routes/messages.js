const express = require("express");
const router = express.Router();
const Message = require("../models/Messages");

// Making a socket.io server
const { Server } = require("socket.io");
const io = new Server(5001, {
  cors: {
    origin: "http://127.0.0.1:5173",
    methods: ["GET", "POST"],
  },
});

// Socket.io endpoints
io.on("connection", (socket) => {
  //listens to all connections
  socket.on("new-user-joined", (name) => {
    console.log("new user", name);
    //when a connection send "new-user-joined" event it does something
    users[socket.id] = name; //joined user gets id and stored in users
    socket.broadcast.emit("user-joined", name); //emits event to all the users except the user joined
  });

  socket.on("sendMsg", (msg) => {
    //listens whenever a msg is sent
    socket.broadcast.emit("receive", { msg, name: users[socket.id] }); //emits event to all the users except the user joined
  });
});

// Route1: Join chat using: POST "/api/msg/join"
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
