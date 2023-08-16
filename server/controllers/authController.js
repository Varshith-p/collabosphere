import User from "../models/User.js";
import asyncHandler from "express-async-handler";
import { StatusCodes } from "http-status-codes";

export const register = asyncHandler(async (req, res) => {
  const { name, email, password, mobile } = req.body;

  if (!name || !email || !password || !mobile) {
    throw new Error("Provide all values");
  }

  const userAlreadyExists = await User.findOne({ email });
  if (userAlreadyExists) {
    throw new Error("Email already registered");
  }

  const user = await User.create(req.body);
  const token = user.createJWT();
  user.password = undefined;
  return res
    .status(StatusCodes.CREATED)
    .json({ user, token, message: "user created" });
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new Error("Provide all values");
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new Error("Invalid credentials");
  }
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new Error("Invalid credentials");
  }
  const token = user.createJWT();
  user.password = undefined;
  return res
    .status(StatusCodes.OK)
    .json({ user, token, message: "login succuessful" });
});
