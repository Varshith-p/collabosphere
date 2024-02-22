import User from "../models/User.js";
import asyncHandler from "express-async-handler";
import { StatusCodes } from "http-status-codes";

export const register = asyncHandler(async (req, res) => {
  const { name, email, password, mobile } = req.body;

  if (!name || !email || !password || !mobile) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Provide all values" });
  }

  const userAlreadyExists = await User.findOne({ email });
  if (userAlreadyExists) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Email already registered" });
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
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Provide all values" });
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "Invalid credentails" });
  }
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "Invalid credentails" });
  }
  const token = user.createJWT();
  user.password = undefined;
  return res
    .status(StatusCodes.OK)
    .json({ user, token, message: "login succuessful" });
});
