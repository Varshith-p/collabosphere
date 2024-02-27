import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Provide project name..."],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    participants: [
      {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
    ],
    admin: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Provide admin..."],
    },
    logo: {
      type: String,
    },
    visibility: {
      type: String,
      enum: ["Public", "Private"],
      default: "Private",
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

ProjectSchema.virtual("messages", {
  ref: "Message",
  localField: "_id",
  foreignField: "project",
});

ProjectSchema.virtual("tasks", {
  ref: "Task",
  localField: "_id",
  foreignField: "project",
});

ProjectSchema.virtual("resources", {
  ref: "Resource",
  localField: "_id",
  foreignField: "project",
});

export default mongoose.model("Project", ProjectSchema);
