import mongoose from "mongoose";

const connectDB = async (url) => {
  await mongoose.connect(url);
  console.log("Connected to DB succesfully!!!");
};

export default connectDB;
