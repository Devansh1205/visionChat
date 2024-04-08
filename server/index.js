// const express = require("express");
// const cors = require("cors");
// const mongoose = require("mongoose");
// const authRoutes = require("./routes/auth");
// const messageRoutes = require("./routes/messages");
// const app = express();
// const httpServer = require("http").createServer(app);
// const io = require("socket.io")(httpServer, {
//   cors: {
//     origin: "*", // Allow all origins
//     methods: ["GET", "POST"] // Allow only GET and POST methods
//   }
// });
// require("dotenv").config();

// app.use(cors());
// app.options("*", cors());
// app.use(express.json());

// mongoose
//   .connect(process.env.MONGO_URL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => {
//     console.log("DB Connection Successful");
//   })
//   .catch((err) => {
//     console.log(err.message);
//   });

// app.use("/api/auth", authRoutes);
// app.use("/api/messages", messageRoutes);

// httpServer.listen(process.env.PORT, () =>
//   console.log(`Server started on ${process.env.PORT}`)
// );

// const onlineUsers = new Map();

// io.on("connection", (socket) => {
//   socket.on("add-user", (userId) => {
//     onlineUsers.set(userId, socket.id);
//   });

//   socket.on("send-msg", (data) => {
//     const sendUserSocket = onlineUsers.get(data.to);
//     if (sendUserSocket) {
//       socket.to(sendUserSocket).emit("msg-recieve", data.msg);
//     }
//   });
// });

// module.exports = { app, onlineUsers };

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const messageRoutes = require("./routes/messages");
const app = express();
const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  }
});
require("dotenv").config();

// Allow requests from all origins during development
const allowedOrigins = ["http://localhost:3000", "https://vision-chat-frontend.vercel.app"];
app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  }
}));
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connection Successful");
  })
  .catch((err) => {
    console.log(err.message);
  });

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

httpServer.listen(process.env.PORT, () =>
  console.log(`Server started on ${process.env.PORT}`)
);

const onlineUsers = new Map();

io.on("connection", (socket) => {
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.msg);
    }
  });
});

module.exports = { app, onlineUsers };
