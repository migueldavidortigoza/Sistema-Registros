import adminRoutes from "./routes/adminRoutes.js";
import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import registroRoutes from "./routes/registrosRoutes.js";

dotenv.config();

connectDB();

const app = express();
const PORT = process.env.PORT || 3000;
 
// Middleware global
app.use(express.json());
app.use("/api/admin", adminRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/registros", registroRoutes);

// Ruta base de Prueba
app.get("/", (req, res) => {
    res.send("Servidor funcionanddo 🚀");
});

// Levantar servidor 
app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});