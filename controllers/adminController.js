import { User } from "../models/user.js";
import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password");
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener usuarios" });
    }
};

export const createUser = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array(),
        });
    }
    try {
        const { username, email, password, role } = req.body;

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({
                message: "El usuario ya existe",
            });
        }

        const HashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            username,
            email,
            password: HashedPassword,
            role: role || "user",
        });

        res.status(201).json({
            _id: newUser._id,
            username: newUser.username,
            email: newUser.email,
            role: newUser.role,
        });
    } catch (erro) {
        res.status(500).json({ message: "Error al crear usuario" });
    }
};