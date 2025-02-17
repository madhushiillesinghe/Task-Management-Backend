import express from "express";
import { protect } from "../middleware/authMiddleware";
import {createTask, deleteTask, getTask, getTasks, updateTask} from "../controller/task/taskController";

const router = express.Router();

router.post("/create", protect, createTask);
router.get("/all", protect, getTasks);
router.get("/:id", protect, getTask);
router.put("/:id", protect, updateTask);
router.delete("/:id", protect, deleteTask);

export default router;
