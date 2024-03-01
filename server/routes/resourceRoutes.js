import express from "express";
import {
  deleteFile,
  getFile,
  uploadFile,
} from "../controllers/resourceController.js";

const router = express.Router();

router.route("/").post(uploadFile);
router.route("/:id").get(getFile).delete(deleteFile);

export default router;
