import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Etiqueta } from "../entities/Etiqueta";

export async function crearEtiqueta(req: Request, res: Response) {
  try {
    const repo = AppDataSource.getRepository(Etiqueta);
    const etiqueta = repo.create(req.body);
    await repo.save(etiqueta);
    res.json(etiqueta);
  } catch (err) {
    res.status(500).json({ error: "Error al crear etiqueta", details: err });
  }
}

export async function listarEtiquetas(req: Request, res: Response) {
  try {
    const repo = AppDataSource.getRepository(Etiqueta);
    const etiquetas = await repo.find();
    res.json(etiquetas);
  } catch (err) {
    res.status(500).json({ error: "Error al listar etiquetas", details: err });
  }
}
