# Gestor de Tareas - Entrega 

## Contenido
- src/data-source.ts        -> DataSource (SQLite)
- src/entities/*            -> Entidades mínimas (Usuario, Equipo, Membresia, Tarea, Etiqueta, Actividad)
- src/migrations/*          -> Migración inicial (crea tablas)
- src/controllers/*         -> Endpoints básicos: usuarios, equipos, tareas, etiquetas, actividad
- demo.ps1                  -> Script PowerShell con flujo de demo
- package.json              -> scripts: dev, build, typeorm (migrate)
- tsconfig.json

## Requisitos
- Node.js (v16+ recomendado)
- Windows PowerShell (la demo está pensada para PowerShell)
- No hace falta instalar base externa: usa SQLite (archivo db.sqlite)

## Pasos para ejecutar (Windows PowerShell)
1. Abrir PowerShell en la carpeta del proyecto.
2. Instalar dependencias:
   npm install

3. Ejecutar migraciones (crea las tablas en db.sqlite):
   npm run migrate

4. Levantar servidor en modo desarrollo:
   npm run dev

5. En otra ventana de PowerShell, ejecutar la demo automática:
   .\demo.ps1

6. Alternativamente, probar endpoints con curl/Postman:
   - POST http://localhost:3000/usuarios  (body JSON: {"nombre","correo"})
   - POST http://localhost:3000/equipos    (body JSON: {"nombre","creado_por":1})
   - POST http://localhost:3000/tareas     (body JSON: {"titulo","creador_id", "equipo_id"})

## Notas
- Las migraciones están en TypeScript en `src/migrations/` y usan SQL compatible con SQLite.
- Las reglas de negocio (validación de fecha, transiciones de estado, no editar tarea finalizada, no eliminar equipo con tareas activas) están implementadas en los controladores.
- La persistencia de actividad se realiza en la tabla `actividad` y se puede consultar vía `GET /actividad`.
