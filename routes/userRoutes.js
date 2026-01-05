import express from "express";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/perfil", protect, (req, res) => {
    res.json({
        message: "Accediste a una ruta protegida",
        user: req.user,
    });
});

export default router;