import express from "express";
import { getAllProjects, getProject } from "../controllers/publicController.js";

const router = express.Router();

router.route("/").get(getAllProjects);
router.route("/:id").get(getProject);

export default router;
