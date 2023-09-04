import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Provide task title..."],
      trim: true,
    },
    status: {
      type: String,
      enum: ["Todo", "In Progress", "Done"],
      required: [true, "Provide task status..."],
    },
    assignedTo: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Provide assignee..."],
    },
    project: {
      type: mongoose.Types.ObjectId,
      ref: "Project",
      required: [true, "Provide project..."],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Task", TaskSchema);
