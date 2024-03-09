import express from "express";
import {
  getAllUsers,
  removePicture,
  uploadPicture,
} from "../controllers/userController.js";

const router = express.Router();

router.route("/").get(getAllUsers).put(uploadPicture).delete(removePicture);

export default router;
