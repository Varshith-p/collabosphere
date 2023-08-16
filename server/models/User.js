import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Provide username..."],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Provide email..."],
      unique: true,
      validate: {
        validator: validator.isEmail,
        message: "Provide a valid email...",
      },
    },
    password: {
      type: String,
      required: [true, "Provide password..."],
      select: false,
    },
    mobile: {
      type: String,
      validate: {
        validator: validator.isMobilePhone,
        message: "Provide a valid mobile number...",
      },
    },
    image: {
      type: String,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

UserSchema.virtual("projects", {
  ref: "project",
  localField: "_id",
  foreignField: "participants",
});

UserSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.comparePassword = async function (candidatepassword) {
  return await bcrypt.compare(candidatepassword, this.password);
};

UserSchema.methods.createJWT = function () {
  return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
};

export default mongoose.model("User", UserSchema);
