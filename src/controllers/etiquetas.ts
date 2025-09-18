import { Router } from "express";
import { AppDataSource } from "../data-source";

const router = Router();

router.post('/', async (req, res) => {
  const { nombre, color } = req.body;
  if (!nombre) return res.status(400).json({ message: 'Falta nombre' });
  await AppDataSource.manager.query('INSERT INTO etiquetas (nombre, color) VALUES (?,?)', [nombre, color || null]);
  const e = await AppDataSource.manager.query('SELECT * FROM etiquetas ORDER BY id DESC LIMIT 1');
  res.status(201).json(e[0]);
});

router.get('/', async (req, res) => {
  const rows = await AppDataSource.manager.query('SELECT * FROM etiquetas ORDER BY creado_en DESC');
  res.json(rows);
});

router.post('/tareas/:id', async (req, res) => {
  const tareaId = Number(req.params.id);
  const { etiquetaId } = req.body;
  await AppDataSource.manager.query('INSERT INTO tareas_etiquetas (tarea_id, etiqueta_id) VALUES (?,?)', [tareaId, etiquetaId]);
  res.json({ message: 'Etiqueta asociada' });
});

router.delete('/tareas/:id/:etiquetaId', async (req, res) => {
  const tareaId = Number(req.params.id);
  const etiquetaId = Number(req.params.etiquetaId);
  await AppDataSource.manager.query('DELETE FROM tareas_etiquetas WHERE tarea_id=? AND etiqueta_id=?', [tareaId, etiquetaId]);
  res.json({ message: 'Etiqueta removida' });
});

export default router;
