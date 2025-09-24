import "reflect-metadata";
import { DataSource } from "typeorm";
import { Usuario } from "./entities/Usuario";
import { Equipo } from "./entities/Equipo";
import { Membresia } from "./entities/Membresia"; 
import { Tarea } from "./entities/Tarea";
import { Etiqueta } from "./entities/Etiqueta";
import { Actividad } from "./entities/Actividad";  

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "db.sqlite",
  synchronize: false,
  logging: false,
  entities: [Usuario, Equipo, Membresia, Tarea, Etiqueta, Actividad],
  migrations: ["src/migrations/*.ts"],
  subscribers: [],
});
