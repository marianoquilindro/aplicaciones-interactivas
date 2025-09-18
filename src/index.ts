import "reflect-metadata";
import express from "express";
import cors from "cors";
import { AppDataSource } from "./data-source";

import usuariosRouter from "./controllers/usuarios";
import equiposRouter from "./controllers/equipos";
import tareasRouter from "./controllers/tareas";
import etiquetasRouter from "./controllers/etiquetas";
import actividadRouter from "./controllers/actividad";

async function main() {
  await AppDataSource.initialize();
  console.log("📦 DataSource inicializado (db.sqlite)");

  const app = express();
  app.use(cors());
  app.use(express.json());

  app.get('/', (req, res) => res.send('API Gestor de Tareas - Primer entrega'));

  app.use('/usuarios', usuariosRouter);
  app.use('/equipos', equiposRouter);
  app.use('/tareas', tareasRouter);
  app.use('/etiquetas', etiquetasRouter);
  app.use('/actividad', actividadRouter);

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Servidor escuchando en http://localhost:${PORT}`));
}

main().catch(err => {
  console.error('Error inicializando la app:', err);
  process.exit(1);
});
