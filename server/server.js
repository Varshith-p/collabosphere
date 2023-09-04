import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/connectDB.js";
import authRouter from "./routes/authRoutes.js";
import projectRouter from "./routes/projectRoutes.js";
import { auth } from "./middleware/auth.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/projects", auth, projectRouter);

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
