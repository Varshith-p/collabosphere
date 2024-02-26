import express from "express";
import {
  createTask,
  deleteTask,
  updateTaskStatus,
} from "../controllers/taskController.js";

const router = express.Router();

router.route("/").post(createTask);
router.route("/:id").patch(updateTaskStatus).delete(deleteTask);

export default router;
