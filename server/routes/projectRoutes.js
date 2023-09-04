import express from "express";
import {
  createProject,
  getAllProjects,
} from "../controllers/projectController.js";

const router = express.Router();

router.route("/").get(getAllProjects).post(createProject);
// router.route("/:id").get(getProject).patch(updateProject).delete(deleteProject);

export default router;
