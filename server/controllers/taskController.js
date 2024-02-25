import Task from "../models/Task.js";
import asyncHandler from "express-async-handler";
import { StatusCodes } from "http-status-codes";
import Project from "../models/Project.js";

export const createTask = asyncHandler(async (req, res) => {
  const { userId } = req.user;
  if (!userId) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "Unauthorized" });
  }
  const { summary, description, project, assignee } = req.body;
  if (!summary || !description || !project || !assignee) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Provide all details" });
  }
  req.body.addedBy = req.user.userId;
  const task = await Task.create(req.body);
  return res
    .status(StatusCodes.CREATED)
    .json({ task, message: "Task created" });
});
