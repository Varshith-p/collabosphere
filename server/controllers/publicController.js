import Project from "../models/Project.js";
import asyncHandler from "express-async-handler";
import { StatusCodes } from "http-status-codes";
import Resource from "../models/Resource.js";

export const getProject = asyncHandler(async (req, res) => {
  const { userId } = req.user;
  if (!userId) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "Unauthorized" });
  }
  const { id: projectId } = req.params;
  const project = await Project.findOne({
    _id: projectId,
    visibility: "Public",
  }).populate("participants", "name email image");
  if (!project) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ message: "Project not found" });
  }
  const resources = await Resource.find({ project: projectId })
    .populate("uploadedBy", "name")
    .sort("-createdAt");
  return res
    .status(StatusCodes.OK)
    .json({ project, resources, message: "Project sent" });
});

export const getAllProjects = asyncHandler(async (req, res) => {
  const { userId } = req.user;
  if (!userId) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "Unauthorized" });
  }
  const projects = await Project.find({ visibility: "Public" })
    .populate("participants", "name email image")
    .sort("-updatedAt");
  return res
    .status(StatusCodes.OK)
    .json({ projects, message: "Projects sent" });
});
