import Project from "../models/Project.js";
import asyncHandler from "express-async-handler";
import { StatusCodes } from "http-status-codes";

export const createProject = asyncHandler(async (req, res) => {
  const { userId } = req.user;
  if (!userId) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "Unauthorized" });
  }
  const { name } = req.body;
  if (!name) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Provide project name" });
  }
  req.body.admin = req.user.userId;
  if (req.body.participants) {
    req.body.participants.unshift(req.user.userId);
  } else {
    req.body.participants = [req.user.userId];
  }
  const project = await Project.create(req.body);
  return res
    .status(StatusCodes.CREATED)
    .json({ project, message: "Project created" });
});

export const getAllProjects = asyncHandler(async (req, res) => {
  const { userId } = req.user;
  if (!userId) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "Unauthorized" });
  }
  const projects = await Project.find({ participants: userId });
  return res
    .status(StatusCodes.OK)
    .json({ projects, message: "Projects sent" });
});
