const { app } = require("./index");
const Message = require("./models/Messages");

const userJoin = async (name) => {
  await Message.create({
    name: name,
    msg: `${name} joined the chat`,
    position: "center",
    isOnline: true,
  });
};
const sendMsg = async (inp, name) => {
  await Message.create({
    name: name,
    msg: inp,
    isOnline: true,
  });
};
const userDisconnect = async (name) => {
  await Message.create({
    name: name,
    isOnline: false,
  });
};

// Initializing new instance of socket.io
const { Server } = require("socket.io");
const io = new Server(5001, {
  cors: {
    origin: "http://127.0.0.1:5173",
    methods: ["GET", "POST"],
  },
});

// Socket.io endpoints
io.on("connection", (socket) => {
  socket.on("new-user-joined", (name) => {
    // sending data to backend
    userJoin(name);

    // sending data to the frontend
    socket.broadcast.emit("user-joined", name);
  });

  socket.on("sendMsg", ({ inp, name }) => {
    // sending data to backend
    sendMsg(inp, name);

    //listens whenever a msg is sent
    socket.broadcast.emit("receive", {
      msg: inp,
      name: name,
    });
  });

  socket.on("disconnect", (name) => {
    socket.broadcast.emit("user-disconnect", name);
    // sending data to backend
    if (name !== "transport close") {
      userDisconnect(name);
    }
  });
});

app.listen(5000, () => {
  console.log(`Listening on port ${5000}`);
});
