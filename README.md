# Gestor de Tareas - Primer Entrega

Aplicación backend para la gestión de tareas, usuarios y equipos.  
Está desarrollada con **Node.js**, **Express**, **TypeScript** y **TypeORM**, utilizando **SQLite** como base de datos embebida.  

---

## 🛠️ Tecnologías utilizadas
- Node.js (v16+ recomendado)
- TypeScript
- Express
- TypeORM
- SQLite




## 📂 Estructura del proyecto
tpo-primer-entrega/
├── src/
│ ├── controllers/ # Controladores con endpoints REST
│ ├── entities/ # Entidades principales (Usuario, Equipo, Membresia, Tarea, Etiqueta, Actividad)
│ ├── migrations/ # Migraciones iniciales de la base de datos
│ ├── data-source.ts # Configuración de la conexión con SQLite
│ └── ...
├── db.sqlite # Base de datos SQLite (se crea tras migraciones)
├── package.json # Scripts y dependencias
├── tsconfig.json # Configuración de TypeScript
├── request.http # Archivo de pruebas para endpoints




## Contenido
- src/data-source.ts        -> DataSource (SQLite)
- src/entities/*            -> Entidades mínimas (Usuario, Equipo, Membresia, Tarea, Etiqueta, Actividad)
- src/migrations/*          -> Migración inicial (crea tablas)
- src/controllers/*         -> Endpoints básicos: usuarios, equipos, tareas, etiquetas, actividad
- package.json              -> scripts: dev, build, typeorm (migrate)
- tsconfig.json

## Requisitos
- Node.js (v16+ recomendado)
- No hace falta instalar base externa: usa SQLite (archivo db.sqlite)




## Pasos para ejecutar (Windows PowerShell)
1. Abrir PowerShell en la carpeta del proyecto.
2. Instalar dependencias:
   npm install

3. Ejecutar migraciones (crea las tablas en db.sqlite):
   npm run typeorm migration:run  

4. Levantar servidor en modo desarrollo:
   npm run dev

5. Probar endpoints el archivo request.http



# Endpoints principales

Usuarios: registro, listado

Equipos: creación, listado

Tareas: crear, editar, cambiar estado, eliminar

## Notas
- Las migraciones están en TypeScript en `src/migrations/` y usan SQL compatible con SQLite.
- Las reglas de negocio están implementadas en los controladores.
- Se puede borrar la base de datos mediante el comando: Remove-Item db.sqlite 
