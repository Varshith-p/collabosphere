import User from "../models/User.js";
import asyncHandler from "express-async-handler";
import { StatusCodes } from "http-status-codes";

export const getAllUsers = asyncHandler(async (req, res) => {
  const { userId } = req.user;
  if (!userId) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "Unauthorized" });
  }
  const users = await User.find({ _id: { $ne: req.user.userId } }).select(
    "name email"
  );
  return res.status(StatusCodes.OK).json({ users, message: "Users found" });
});
