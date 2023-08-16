import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Provide user..."],
    },
    content: {
      type: String,
      trim: true,
    },
    project: {
      type: mongoose.Types.ObjectId,
      ref: "Project",
      required: [true, "Provide project..."],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Project", ProjectSchema);
