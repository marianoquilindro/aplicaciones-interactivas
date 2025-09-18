import { Router } from "express";
import { AppDataSource } from "../data-source";

const router = Router();

router.post('/', async (req, res) => {
  try {
    const { titulo, descripcion, creador_id, equipo_id, prioridad, fecha_vencimiento, asignada_a } = req.body;
    if (!titulo || !creador_id || !equipo_id) return res.status(400).json({ message: 'Faltan datos obligatorios' });
    if (fecha_vencimiento) {
      const v = new Date(fecha_vencimiento);
      if (isNaN(v.getTime())) return res.status(400).json({ message: 'Fecha inválida' });
      if (v < new Date()) return res.status(400).json({ message: 'Fecha de vencimiento no puede ser pasada' });
    }
    await AppDataSource.manager.query('INSERT INTO tareas (titulo, descripcion, creador_id, equipo_id, prioridad, fecha_vencimiento, asignada_a) VALUES (?,?,?,?,?,?,?)', [titulo, descripcion || null, creador_id, equipo_id, prioridad || 2, fecha_vencimiento || null, asignada_a || null]);
    const t = await AppDataSource.manager.query('SELECT * FROM tareas ORDER BY id DESC LIMIT 1');
    await AppDataSource.manager.query('INSERT INTO actividad (equipo_id, usuario_id, tipo, descripcion, metadata) VALUES (?,?,?,?,?)', [equipo_id, creador_id, 'tarea_creada', `Tarea ${t[0].titulo} creada`, JSON.stringify({tareaId: t[0].id})]);
    res.status(201).json(t[0]);
  } catch (e:any) {
    res.status(500).json({ message: 'Error', error: String(e) });
  }
});

router.get('/', async (req, res) => {
  const { estado, prioridad, q } = req.query;
  let sql = 'SELECT * FROM tareas';
  const where: string[] = [];
  const params: any[] = [];
  if (estado) { where.push('estado = ?'); params.push(String(estado)); }
  if (prioridad) { where.push('prioridad = ?'); params.push(Number(prioridad)); }
  if (q) { where.push('(titulo LIKE ? OR descripcion LIKE ?)'); params.push('%'+String(q)+'%', '%'+String(q)+'%'); }
  if (where.length) sql += ' WHERE ' + where.join(' AND ');
  sql += ' ORDER BY creado_en DESC';
  const rows = await AppDataSource.manager.query(sql, params);
  res.json(rows);
});

router.get('/:id', async (req, res) => {
  const id = Number(req.params.id);
  const t = await AppDataSource.manager.query('SELECT * FROM tareas WHERE id = ?', [id]);
  if (!t || t.length === 0) return res.status(404).json({ message: 'No encontrada' });
  const etiquetas = await AppDataSource.manager.query('SELECT e.* FROM etiquetas e JOIN tareas_etiquetas te ON te.etiqueta_id=e.id WHERE te.tarea_id=?', [id]);
  const comentarios = await AppDataSource.manager.query('SELECT * FROM comentarios WHERE tarea_id=? ORDER BY creado_en ASC', [id]);
  const historial = await AppDataSource.manager.query('SELECT * FROM historial_de_estados WHERE tarea_id=? ORDER BY cambiado_en ASC', [id]);
  res.json({ tarea: t[0], etiquetas, comentarios, historial });
});

router.put('/:id', async (req, res) => {
  const id = Number(req.params.id);
  const existing = await AppDataSource.manager.query('SELECT estado FROM tareas WHERE id=?', [id]);
  if (!existing || existing.length === 0) return res.status(404).json({ message: 'No encontrada' });
  const estado = existing[0].estado;
  if (['FINALIZADA','CANCELADA'].includes(estado)) return res.status(400).json({ message: 'No se puede editar tarea Finalizada o Cancelada' });
  const { titulo, descripcion, prioridad, fecha_vencimiento, asignada_a } = req.body;
  if (fecha_vencimiento) {
    const v = new Date(fecha_vencimiento);
    if (isNaN(v.getTime())) return res.status(400).json({ message: 'Fecha inválida' });
    if (v < new Date()) return res.status(400).json({ message: 'Fecha de vencimiento no puede ser pasada' });
  }
  await AppDataSource.manager.query('UPDATE tareas SET titulo=?, descripcion=?, prioridad=?, fecha_vencimiento=?, asignada_a=?, actualizado_en=CURRENT_TIMESTAMP WHERE id=?', [titulo, descripcion, prioridad, fecha_vencimiento || null, asignada_a || null, id]);
  res.json({ message: 'Tarea actualizada' });
});

router.delete('/:id', async (req, res) => {
  const id = Number(req.params.id);
  await AppDataSource.manager.query('DELETE FROM tareas WHERE id=?', [id]);
  res.json({ message: 'Tarea eliminada' });
});

const TRANSICIONES: any = {
  'PENDIENTE': ['EN_PROGRESO','CANCELADA','FINALIZADA'],
  'EN_PROGRESO': ['PENDIENTE','FINALIZADA','CANCELADA'],
  'FINALIZADA': [],
  'CANCELADA': []
};

router.post('/:id/cambiar-estado', async (req, res) => {
  const id = Number(req.params.id);
  const { nuevoEstado, usuarioId } = req.body;
  const r = await AppDataSource.manager.query('SELECT estado, equipo_id FROM tareas WHERE id=?', [id]);
  if (!r || r.length === 0) return res.status(404).json({ message: 'No encontrada' });
  const estadoActual = r[0].estado;
  const equipoId = r[0].equipo_id;
  if (!TRANSICIONES[estadoActual] || !TRANSICIONES[estadoActual].includes(nuevoEstado)) return res.status(400).json({ message: 'Transición inválida' });
  await AppDataSource.manager.query('BEGIN');
  try {
    await AppDataSource.manager.query('UPDATE tareas SET estado=?, actualizado_en=CURRENT_TIMESTAMP WHERE id=?', [nuevoEstado, id]);
    await AppDataSource.manager.query('INSERT INTO historial_de_estados (tarea_id, estado_anterior, estado_nuevo, cambiado_por) VALUES (?,?,?,?)', [id, estadoActual, nuevoEstado, usuarioId || null]);
    await AppDataSource.manager.query('INSERT INTO actividad (equipo_id, usuario_id, tipo, descripcion, metadata) VALUES (?,?,?,?,?)', [equipoId || null, usuarioId || null, 'estado_cambiado', `Estado ${estadoActual} -> ${nuevoEstado}`, JSON.stringify({tareaId: id})]);
    await AppDataSource.manager.query('COMMIT');
    res.json({ message: 'Estado cambiado' });
  } catch (e:any) {
    await AppDataSource.manager.query('ROLLBACK');
    res.status(500).json({ message: 'Error al cambiar estado', error: String(e) });
  }
});

export default router;
