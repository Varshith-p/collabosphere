import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { logger } from "./middleware/logEvents.js";
import errorHandler from "./middleware/errorHandler.js";
import connectDB from "./db/connectDB.js";
import authRouter from "./routes/authRoutes.js";
import projectRouter from "./routes/projectRoutes.js";
import userRouter from "./routes/userRoutes.js";
import { auth } from "./middleware/auth.js";

dotenv.config();
const app = express();

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
    app.listen(port, () => console.log(`Server listening on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
