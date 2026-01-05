import { Task } from "../models/Task.js";

export const createTask = async (req, res) => {
  
    try {
        const { title } = req.body;

        const newTask = new Task({
            title,
            user: req.user._id,
        });

        await newTask.save();
        res.status(201).json(newTask);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error creando tarea" });
    }
};

export const getMyTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user._id });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener tareas" });
    }
};

export const toggleTask = async (req, res) => {
    try {
        const task = await Task.findOne({
            _id: req.params.id,
            user: req.user._id, 
        });

        if (!task) {
            return res.status(404).json({ message: "Tarea no encontrada" });
        }

        task.completed = !task.completed;
        await task.save();
        
        res.json(task);
    } catch (error) {
        res.status(500).json({ messages: "Error actualizando tarea" });
    }
};

export const deleteTask = async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({
            _id: req.params.id,
            user: req.user._id,
        });

        if (!task) {
            return res.status(404).json({ message: "Tarea no encontrada" });
        }

        res.json({ message: "Tarea eliminada" });
    } catch (error) {
        res.status(500).json({ message: "Error eliminando tarea" });
    }
};