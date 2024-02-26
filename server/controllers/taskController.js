import Task from "../models/Task.js";
import asyncHandler from "express-async-handler";
import { StatusCodes } from "http-status-codes";

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

export const updateTaskStatus = asyncHandler(async (req, res) => {
  const { userId } = req.user;
  if (!userId) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "Unauthorized" });
  }
  const task = await Task.findByIdAndUpdate(req.body._id, req.body);
  return res.status(StatusCodes.OK).json({ task, message: "Task updated" });
});

export const deleteTask = asyncHandler(async (req, res) => {
  const { userId } = req.user;
  if (!userId) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "Unauthorized" });
  }
  const { id: taskId } = req.params;
  const task = await Task.findByIdAndDelete(taskId);
  return res.status(StatusCodes.OK).json({ task, message: "Task deleted" });
});
