import express from "express"; 
import { protect } from "../middlewares/authMiddleware.js";
import {
    createTask, 
    getMyTasks,
    toggleTask,
    deleteTask,
} from "../controllers/taskController.js";

const router = express.Router();

router.post("/", protect, createTask);
router.get("/", protect, getMyTasks);
router.put("/:id", protect, toggleTask);
router.delete("/:id", protect, deleteTask);

export default router;
