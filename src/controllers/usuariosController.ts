import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Usuario } from "../entities/Usuario";

export const crearUsuario = async (req: Request, res: Response) => {
  try {
    const { nombre, correo } = req.body;
    const repo = AppDataSource.getRepository(Usuario);
    const usuario = repo.create({ nombre, correo });
    await repo.save(usuario);
    res.json(usuario);
  } catch (err) {
    res.status(500).json({ error: "Error al crear usuario", details: err });
  }
};

export const listarUsuarios = async (_req: Request, res: Response) => {
  const repo = AppDataSource.getRepository(Usuario);
  const usuarios = await repo.find();
  res.json(usuarios);
};
