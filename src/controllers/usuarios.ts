import { Router } from "express";
import { AppDataSource } from "../data-source";

const router = Router();

router.post('/', async (req, res) => {
  const { nombre, correo } = req.body;
  if (!nombre || !correo) return res.status(400).json({ message: 'Faltan datos' });
  await AppDataSource.manager.query('INSERT INTO usuarios (nombre, correo) VALUES (?,?)', [nombre, correo]);
  const rows = await AppDataSource.manager.query('SELECT * FROM usuarios ORDER BY id DESC LIMIT 1');
  res.status(201).json(rows[0]);
});

router.get('/', async (req, res) => {
  const rows = await AppDataSource.manager.query('SELECT * FROM usuarios ORDER BY creado_en DESC');
  res.json(rows);
});

export default router;
