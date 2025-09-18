import { Router } from "express";
import { AppDataSource } from "../data-source";

const router = Router();

router.post('/', async (req, res) => {
  const { nombre, creado_por } = req.body;
  if (!nombre || !creado_por) return res.status(400).json({ message: 'Faltan datos' });
  await AppDataSource.manager.query('INSERT INTO equipos (nombre, creado_por) VALUES (?,?)', [nombre, creado_por]);
  const eq = await AppDataSource.manager.query('SELECT * FROM equipos ORDER BY id DESC LIMIT 1');
  await AppDataSource.manager.query('INSERT INTO membresias (equipo_id, usuario_id, rol) VALUES (?,?,?)', [eq[0].id, creado_por, 'owner']);
  res.status(201).json(eq[0]);
});

router.get('/', async (req, res) => {
  const rows = await AppDataSource.manager.query('SELECT * FROM equipos ORDER BY creado_en DESC');
  res.json(rows);
});

router.post('/:id/membresias', async (req, res) => {
  const equipoId = Number(req.params.id);
  const { usuarioId, rol } = req.body;
  if (!usuarioId || !rol) return res.status(400).json({ message: 'Faltan datos' });
  await AppDataSource.manager.query('INSERT INTO membresias (equipo_id, usuario_id, rol) VALUES (?,?,?)', [equipoId, usuarioId, rol]);
  res.json({ message: 'Membresía agregada' });
});

export default router;
