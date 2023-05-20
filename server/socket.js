const io = require("./index");

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
    socket.broadcast.emit("user-disconnect", name);
  });
});
