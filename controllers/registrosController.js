import Registro from "../models/registro.js";

export const createRegistro = async (req, res) => {
    try {
        const { titulo, descripcion } = req.body;

        if (!titulo) {
            return res.status(400).json({ message: "Falta el titulo" });
        }

        const nuevoRegistro = await Registro.create({
            titulo,
            descripcion,
            user: req.user._id
        });

        res.status(201).json(nuevoRegistro);
    } catch (error) {
        res.status(500).json({ message: "Error al crear registro" });
    }
};

export const getRegistros = async (req, res) => {
    try {
        const registros = await Registro.find({
            user: req.user._id
        });

        res.json(registros);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener registros" });
    }
};

export const updateRegistro = async (req, res) => {
    try {
        const { id } = req.params;
        const { titulo, descripcion } = req.body;

        const registro = await Registro.findOne({
            _id: id,
            user: req.user._id
        });

        if (!registro) {
            return res.status(404).json({ message: "Registro no enconctrado" });
        }

        registro.titulo = titulo ?? registro.titulo;
        registro.descripcion = descripcion ?? registro.descripcion;

        await registro.save();

        res.json(registro);
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar registro" });
    }
};

export const deleteRegistro = async (req, res) => {
    try {
        const { id } = req.params;

        const registro = await Registro.findOneAndDelete({
            _id: id,
            user: req.user._id
        });

        if (!registro) {
            return res.status(404).json({ message: "Registri no encontrado" });
        }

        res.json({ message: "Registro eliminado "});
    } catch (erro) {
        res.status(500).json({ message: "Error al eliminar registro" });
    }
};
