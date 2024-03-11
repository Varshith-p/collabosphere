import express from "express";
import {
  getAllUsers,
  removePicture,
  updateProfile,
  uploadPicture,
} from "../controllers/userController.js";

const router = express.Router();

router
  .route("/")
  .get(getAllUsers)
  .patch(updateProfile)
  .put(uploadPicture)
  .delete(removePicture);

export default router;
