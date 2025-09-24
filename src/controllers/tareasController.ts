import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Tarea } from "../entities/Tarea";

const tareaRepo = AppDataSource.getRepository(Tarea);

// Crear tarea con validaciones
export const crearTarea = async (req: Request, res: Response) => {
  try {
    const { titulo, descripcion, fecha_vencimiento, creador_id, equipo_id } = req.body;

    // Validar campos obligatorios
    if (!titulo || !creador_id || !equipo_id) {
      return res.status(400).json({
        message: "Faltan datos obligatorios: titulo, creador_id y equipo_id son requeridos.",
      });
    }

    const nuevaTarea = tareaRepo.create({
      titulo,
      descripcion,
      estado: "PENDIENTE",
      prioridad: 1,
      fecha_vencimiento,
      creador_id,
      equipo_id,
    });

    const tareaGuardada = await tareaRepo.save(nuevaTarea);
    res.status(201).json(tareaGuardada);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear tarea", error });
  }
};

// Listar todas las tareas
export const getTareas = async (req: Request, res: Response) => {
  try {
    const tareas = await tareaRepo.find();
    res.json(tareas);
  } catch (error) {
    res.status(500).json({ message: "Error al listar tareas", error });
  }
};

// Obtener detalle de tarea por id
export const getTareaDetalle = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const tarea = await tareaRepo.findOneBy({ id: parseInt(id) });
    if (!tarea) {
      return res.status(404).json({ message: "Tarea no encontrada" });
    }
    res.json(tarea);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener tarea", error });
  }
};



// Editar una tarea completa
export const editarTarea = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { titulo, descripcion, prioridad, fecha_vencimiento } = req.body;

    const tarea = await tareaRepo.findOneBy({ id: parseInt(id) });

    if (!tarea) {
      return res.status(404).json({ message: "Tarea no encontrada" });
    }

    tarea.titulo = titulo ?? tarea.titulo;
    tarea.descripcion = descripcion ?? tarea.descripcion;
    tarea.prioridad = prioridad ?? tarea.prioridad;
    tarea.fecha_vencimiento = fecha_vencimiento ?? tarea.fecha_vencimiento;
    tarea.actualizado_en = new Date().toISOString();

    await tareaRepo.save(tarea);

    res.json({ message: "Tarea actualizada correctamente", tarea });
  } catch (error) {
    res.status(500).json({ message: "Error al editar tarea", error });
  }
};


// Cambiar estado de la tarea
export const cambiarEstadoTarea = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { nuevoEstado } = req.body;

    const tarea = await tareaRepo.findOneBy({ id: parseInt(id) });

    if (!tarea) {
      return res.status(404).json({ message: "Tarea no encontrada" });
    }

    tarea.estado = nuevoEstado;
    tarea.actualizado_en = new Date().toISOString();

    await tareaRepo.save(tarea);

    res.json({ message: `Estado de la tarea cambiado a ${nuevoEstado}`, tarea });
  } catch (error) {
    res.status(500).json({ message: "Error al cambiar estado de tarea", error });
  }
};


// Borrar tarea
export const borrarTarea = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const tarea = await tareaRepo.findOneBy({ id: parseInt(id) });

    if (!tarea) {
      return res.status(404).json({ message: "Tarea no encontrada" });
    }

    await tareaRepo.remove(tarea);
    res.json({ message: "Tarea eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al borrar tarea", error });
  }
};
