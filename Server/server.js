const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(
  cors({
    origin: "https://doodle-sketch.netlify.app",
    methods: ["GET", "POST"],
    credentials: true,
  })
);

const httpServer = createServer(app);
const io = new Server(httpServer, { cors: "https://doodle-sketch.netlify.app" });

io.on("connection", (socket) => {
  console.log("Connected socket");

  const { roomid } = socket.handshake.headers;
  socket.join(roomid);

  socket.on("beginPath", (args) => {
    socket.to(roomid).emit("beginPath", args);
  });

  socket.on("drawLine", (args) => {
    socket.to(roomid).emit("drawLine", args);
  });

  socket.on("changeConfig", (args) => {
    socket.to(roomid).emit("changeConfig", args);
  });

  socket.on("newChat", (args) => {
    io.to(roomid).emit("newChat", args);
  });

  socket.on("disconnect", () => {
    socket.leave(roomid);
  });
});

const PORT = 3000;
httpServer.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});
