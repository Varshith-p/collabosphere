import Message from "../models/Message.js";
import asyncHandler from "express-async-handler";
import { StatusCodes } from "http-status-codes";

export const createMessage = asyncHandler(async (req, res) => {
  const { userId } = req.user;
  if (!userId) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "Unauthorized" });
  }
  const { content, project } = req.body;
  if (!content || !project) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Provide all details" });
  }
  req.body.sender = req.user.userId;
  const messageObj = await Message.create(req.body);
  return res
    .status(StatusCodes.CREATED)
    .json({ message: messageObj, message: "Task created" });
});
