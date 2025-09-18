import { Router } from "express";
import { AppDataSource } from "../data-source";

const router = Router();

router.get('/', async (req, res) => {
  const { equipoId, usuarioId, page=1, limit=20 } = req.query;
  const pageN = Math.max(Number(page || 1), 1);
  const lim = Math.max(Number(limit || 20), 1);
  const offset = (pageN - 1) * lim;
  const where: string[] = [];
  const params: any[] = [];
  if (equipoId) { where.push('equipo_id = ?'); params.push(Number(equipoId)); }
  if (usuarioId) { where.push('usuario_id = ?'); params.push(Number(usuarioId)); }
  let sql = 'SELECT * FROM actividad';
  if (where.length) sql += ' WHERE ' + where.join(' AND ');
  sql += ' ORDER BY creado_en DESC LIMIT ? OFFSET ?';
  params.push(lim, offset);
  const rows = await AppDataSource.manager.query(sql, params);
  res.json({ page: pageN, limit: lim, items: rows });
});

export default router;
