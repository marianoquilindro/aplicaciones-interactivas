import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Actividad } from "../entities/Actividad";

export async function listarActividad(req: Request, res: Response) {
  try {
    const repo = AppDataSource.getRepository(Actividad);
    const { equipoId, usuarioId, page = 1, limit = 10 } = req.query;

    const qb = repo.createQueryBuilder("actividad");

    if (equipoId) {
      qb.andWhere("actividad.equipo_id = :equipoId", { equipoId });
    }
    if (usuarioId) {
      qb.andWhere("actividad.usuario_id = :usuarioId", { usuarioId });
    }

    qb.skip((+page - 1) * +limit).take(+limit).orderBy("actividad.creado_en", "DESC");

    const data = await qb.getMany();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Error al listar actividad", details: err });
  }
}