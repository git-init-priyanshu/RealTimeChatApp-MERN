// Connecting to mongodb
const connectToMongoDB = require("./mongodb");
connectToMongoDB();

const express = require("express");
const app = express();
const port = 5000;

// To access req.body
app.use(express.json());

// Fixing CORS issues
const cors = require("cors");
app.use(cors({ origin: "http://127.0.0.1:5173" }));

// Making a socket.io server
const { Server } = require("socket.io");
const io = new Server(5001, {
  cors: {
    origin: "http://127.0.0.1:5173",
    methods: ["GET", "POST"],
  },
});

const users = {};

// Socket.io endpoints
io.on("connection", (socket) => {
  socket.on("new-user-joined", (name) => {
    // sending data to the frontend
    users[socket.id] = name; //joined user gets id and stored in users
    socket.broadcast.emit("user-joined", name);
  });

  socket.on("sendMsg", ({ inp, name }) => {
    //listens whenever a msg is sent
    socket.broadcast.emit("receive", {
      msg: inp,
      name: name,
    });
  });

  socket.on("disconnect", (name) => {
    socket.broadcast.emit("user-disconnect", { id: socket.id, name });
  });
});

// Available routes
// app.use("/api/msg", require("./routes/messages.js"));
// app.post("/api/msg", (req, res) => {
//   res.send("hello");
// });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
