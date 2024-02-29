import mongoose from "mongoose";

const ResourceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Provide file name..."],
      trim: true,
    },
    uploadedBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Provide user..."],
    },
    project: {
      type: mongoose.Types.ObjectId,
      ref: "Project",
      required: [true, "Provide project..."],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Resource", ResourceSchema);
