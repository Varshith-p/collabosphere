import asyncHandler from "express-async-handler";
import { StatusCodes } from "http-status-codes";
import { deleteObject, getUrl, upload } from "../utils/s3.js";
import Project from "../models/Project.js";
import Resource from "../models/Resource.js";

export const uploadFile = asyncHandler(async (req, res) => {
  const { userId } = req.user;
  if (!userId) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "Unauthorized" });
  }
  const { projectId } = req.query;
  const project = await Project.findById(projectId);
  if (!project) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Project does not exist" });
  }
  const file = req.file;
  if (!file) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Provide file" });
  }
  await upload(file, `${projectId}/${file.originalname}`);
  let resource = await Resource.findOne({
    name: file.originalname,
    project: projectId,
  });
  if (!resource) {
    resource = await Resource.create({
      name: file.originalname,
      uploadedBy: userId,
      project: projectId,
    });
  } else {
    resource = await Resource.findByIdAndUpdate(
      resource._id,
      { name: resource.name },
      { runValidators: true, new: true }
    );
  }
  return res
    .status(StatusCodes.OK)
    .json({ resource, message: "Resource created" });
});

export const getFile = asyncHandler(async (req, res) => {
  const { userId } = req.user;
  if (!userId) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "Unauthorized" });
  }
  const { projectId } = req.query;
  const project = await Project.findById(projectId);
  if (!project) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Project does not exist" });
  }
  const { id: resourceId } = req.params;
  const resource = await Resource.findOne({
    _id: resourceId,
    project: projectId,
  }).lean();
  if (!resource) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Resource does not exist" });
  }
  resource.url = await getUrl(`${projectId}/${resource.name}`);
  return res
    .status(StatusCodes.OK)
    .json({ resource, message: "Resource found" });
});

export const deleteFile = asyncHandler(async (req, res) => {
  const { userId } = req.user;
  if (!userId) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "Unauthorized" });
  }
  const { projectId } = req.query;
  const project = await Project.findById(projectId);
  if (!project) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Project does not exist" });
  }
  console.log("first");
  const { id: resourceId } = req.params;
  const resource = await Resource.findOne({
    _id: resourceId,
    project: projectId,
  }).lean();
  if (!resource) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Resource does not exist" });
  }
  console.log("delete start");
  await deleteObject(`${projectId}/${resource.name}`);
  await Resource.findByIdAndDelete(resourceId);
  console.log("delete done");
  return res
    .status(StatusCodes.OK)
    .json({ resource, message: "Resource deleted" });
});
