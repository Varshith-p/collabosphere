import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import multer from "multer";
import http from "http";
import { Server } from "socket.io";
import { logger } from "./middleware/logEvents.js";
import errorHandler from "./middleware/errorHandler.js";
import connectDB from "./db/connectDB.js";
import authRouter from "./routes/authRoutes.js";
import projectRouter from "./routes/projectRoutes.js";
import taskRouter from "./routes/taskRoutes.js";
import resourceRouter from "./routes/resourceRoutes.js";
import messageRouter from "./routes/messageRoutes.js";
import userRouter from "./routes/userRoutes.js";
import { auth } from "./middleware/auth.js";

dotenv.config();
const app = express();
const server = http.createServer(app);

// Attach Socket.io to the HTTP server
const io = new Server(server, {
  cors: { origin: "http://localhost:5173" },
});

io.on("connection", (socket) => {
  console.log("connected to socket.io");

  socket.on("join_chat", (room) => {
    socket.join(room);
    console.log(room);
  });

  socket.on("send_message", (message) => {
    socket.broadcast.to(message.project).emit("receive_message", message);
  });
});

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 25 * 1024 * 1024, // 25MB
  },
});

// logger middleware
app.use(logger);

// Cross Origin Resource Sharing
const whiteList = ["http://127.0.0.1:5173", "http://localhost:5173"];
const corsOptions = {
  origin: (origin, callback) => {
    // if (whiteList.indexOf(origin) !== -1) {
    if (whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// built-in middleware for json
app.use(express.json());

// Route handlers
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", auth, userRouter);
app.use("/api/v1/projects", auth, projectRouter);
app.use("/api/v1/tasks", auth, taskRouter);
app.use("/api/v1/resources", auth, upload.single("file"), resourceRouter);
app.use("/api/v1/messages", auth, messageRouter);

// not-found
app.all("*", (req, res) => {
  res.status(404).json({ message: "404 Not Found" });
});

// error handler
app.use(errorHandler);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    server.listen(port, () =>
      console.log(`Server listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
