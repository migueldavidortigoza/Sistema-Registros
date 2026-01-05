import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { createRegistro, getRegistros, updateRegistro, deleteRegistro } from "../controllers/registrosController.js";

const router = express.Router();

router.post("/", protect, createRegistro);
router.get("/", protect, getRegistros);
router.put("/:id", protect, updateRegistro);
router.delete("/:id", protect, deleteRegistro);

export default router;