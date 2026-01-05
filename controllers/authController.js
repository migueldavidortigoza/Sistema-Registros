import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/user.js";

export const registerUser = async (req, res) => {
    console.log("BODY:", req.body);
    console.log("USERNAME:", req.body.username);

    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({
            message: "Todos los campos son obligatorios",
        });
    }

    const emailRegex = /^\S+@\S+\.\S+$/;

    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: "Email inválido" });
    }

    if (password.length < 6) {
        return res.status(400).json({
            message: "La contraseña debe tener al menos 6 caracteres",
        });
    }

    try {
        // Verificar si el usuario ya existe
        const userExists = await User.findOne({ $or: [{ email }, { username }],
        }); 

        if (userExists) {
            return res.status(400).json({
                message: "El usuario o el email ya existen", 
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        res.status(201).json({
            message: "Usuario registro con éxitos",
            user: {
                username: newUser.username,
                email: newUser.email,
            },
        });
    } catch (error) {
        console.error("ERROR LOGIN:", error);
        res.status(500).json({ message: "Error en el servidor" });
    }
};

export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Credenciales invalidas" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Credenciales invalidas" });
        }

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.json({ 
            message: "Login exitoso",
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
            },
        });
    } catch (error) {
        console.error("ERROR LOGIN:", error);
        res.status(500).json({ message: "Error en el servidor" });
    }
};