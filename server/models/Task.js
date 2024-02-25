import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema(
  {
    summary: {
      type: String,
      required: [true, "Provide task title..."],
      trim: true,
    },
    status: {
      type: String,
      enum: ["Todo", "In Progress", "Done"],
      default: "Todo",
    },
    addedBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Provide user..."],
    },
    assignee: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Provide assignee..."],
    },
    project: {
      type: mongoose.Types.ObjectId,
      ref: "Project",
      required: [true, "Provide project..."],
    },
    description: {
      type: String,
      required: [true, "Provide task description..."],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Task", TaskSchema);
