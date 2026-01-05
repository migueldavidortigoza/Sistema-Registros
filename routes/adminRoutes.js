import express from "express";
import { body } from "express-validator";
import { protect, isAdmin } from "../middlewares/authMiddleware.js";
import { createUser, getAllUsers } from "../controllers/adminController.js";

const router = express.Router();


router.get("/users", protect, isAdmin, getAllUsers);

router.post("/users", protect, isAdmin,
    [
        body("username").notEmpty().withMessage("username requerido"),
        body("email").isEmail().withMessage("email inválido"),
        body("password")
          .isLength({ min: 6 })
          .withMessage("password mínimo 6 caracteres"),
    ],
    createUser
);

export default router;