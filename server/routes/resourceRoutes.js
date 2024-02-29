import express from "express";
import { uploadFile } from "../controllers/resourceController.js";

const router = express.Router();

router.route("/").post(uploadFile);
// router.route("/:id").get(getProject)

export default router;
