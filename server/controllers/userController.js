import User from "../models/User.js";
import asyncHandler from "express-async-handler";
import { StatusCodes } from "http-status-codes";
import { deleteImage, uploadImage } from "../utils/s3.js";
import dotenv from "dotenv";

dotenv.config();

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

export const updateProfile = asyncHandler(async (req, res) => {
  const { userId } = req.user;
  if (!userId) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "Unauthorized" });
  }
  const userExists = await User.findById(userId);
  if (!userExists) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "User does not exist" });
  }
  // const { name, email } = req.body;
  const user = await User.findByIdAndUpdate(userId, req.body, {
    runValidators: true,
    new: true,
  });
  return res.status(StatusCodes.OK).json({ user, message: "Profile updated" });
});

export const uploadPicture = asyncHandler(async (req, res) => {
  const { userId } = req.user;
  if (!userId) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "Unauthorized" });
  }
  const user = await User.findById(userId);
  if (!user) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "User does not exist" });
  }
  const file = req.file;
  if (!file) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Provide image" });
  }
  await uploadImage(file, userId);
  user.image = `https://${process.env.AWS_PUBLIC_BUCKET_NAME}.s3.amazonaws.com/${userId}`;
  await user.save();
  user.password = undefined;
  return res.status(StatusCodes.OK).json({ user, message: "Image updated" });
});

export const removePicture = asyncHandler(async (req, res) => {
  const { userId } = req.user;
  if (!userId) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "Unauthorized" });
  }
  const user = await User.findById(userId);
  if (!user) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "User does not exist" });
  }
  if (!user.image) {
    return res.status(StatusCodes.OK).json({ message: "No image to remove" });
  }
  await deleteImage(userId);
  user.image = ``;
  await user.save();
  user.password = undefined;
  return res.status(StatusCodes.OK).json({ user, message: "Image removed" });
});
