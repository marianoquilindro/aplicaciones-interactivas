import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Equipo } from "../entities/Equipo";

export const crearEquipo = async (req: Request, res: Response) => {
  try {
    const { nombre, creado_por } = req.body;
    const repo = AppDataSource.getRepository(Equipo);
    const equipo = repo.create({ nombre, creado_por });
    await repo.save(equipo);
    res.json(equipo);
  } catch (err) {
    res.status(500).json({ error: "Error al crear equipo", details: err });
  }
};

export const listarEquipos = async (_req: Request, res: Response) => {
  const repo = AppDataSource.getRepository(Equipo);
  const equipos = await repo.find();
  res.json(equipos);
};
