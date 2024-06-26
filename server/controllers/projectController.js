import Project from "../models/Project.js";
import asyncHandler from "express-async-handler";
import { StatusCodes } from "http-status-codes";
import Resource from "../models/Resource.js";
import Message from "../models/Message.js";

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

export const getProject = asyncHandler(async (req, res) => {
  const { userId } = req.user;
  if (!userId) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "Unauthorized" });
  }
  const { id: projectId } = req.params;
  const project = await Project.findOne({ _id: projectId }).populate([
    {
      path: "tasks",
      populate: { path: "assignee", select: "name" },
    },
    { path: "participants", select: "name email image" },
  ]);
  if (!project) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ message: "Project not found" });
  }
  const resources = await Resource.find({ project: projectId })
    .populate("uploadedBy", "name")
    .sort("-createdAt");
  const messages = await Message.find({ project: projectId }).populate(
    "sender",
    "name image"
  );
  return res
    .status(StatusCodes.OK)
    .json({ project, resources, messages, message: "Project sent" });
});

export const getAllProjects = asyncHandler(async (req, res) => {
  const { userId } = req.user;
  if (!userId) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "Unauthorized" });
  }
  const projects = await Project.find({ participants: userId })
    .populate(["tasks", { path: "participants", select: "name email image" }])
    .sort("-updatedAt");
  return res
    .status(StatusCodes.OK)
    .json({ projects, message: "Projects sent" });
});

export const updateProject = asyncHandler(async (req, res) => {
  const { userId } = req.user;
  if (!userId) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "Unauthorized" });
  }
  const { name } = req.body;
  const { id: projectId } = req.params;
  if (!name) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Provide project name" });
  }
  await Project.findByIdAndUpdate(projectId, req.body, {
    runValidators: true,
    new: true,
  });
  const project = await Project.findOne({ _id: projectId }).populate([
    "tasks",
    { path: "participants", select: "name email image" },
  ]);
  return res
    .status(StatusCodes.OK)
    .json({ project, message: "Project updated" });
});
