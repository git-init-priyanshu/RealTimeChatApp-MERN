const express = require("express");
const app = express();
const port = 5000;

const cors = require("cors");
app.use(cors());

// const http = require("http");
// const server = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(5001, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

const users = {};

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

// Available routes
app.use("/api", require("./routes/messages"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
