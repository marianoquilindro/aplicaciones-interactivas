import { MigrationInterface, QueryRunner } from "typeorm";

export class InitMigration1690000000000 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`PRAGMA foreign_keys = OFF;`);

        await queryRunner.query(`CREATE TABLE IF NOT EXISTS usuarios (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nombre TEXT NOT NULL,
            correo TEXT NOT NULL UNIQUE,
            creado_en DATETIME DEFAULT (CURRENT_TIMESTAMP)
        );`);

        await queryRunner.query(`CREATE TABLE IF NOT EXISTS equipos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nombre TEXT NOT NULL,
            creado_por INTEGER NOT NULL,
            creado_en DATETIME DEFAULT (CURRENT_TIMESTAMP)
        );`);

        await queryRunner.query(`CREATE TABLE IF NOT EXISTS membresias (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            equipo_id INTEGER NOT NULL,
            usuario_id INTEGER NOT NULL,
            rol TEXT NOT NULL,
            agregado_en DATETIME DEFAULT (CURRENT_TIMESTAMP),
            UNIQUE(equipo_id, usuario_id)
        );`);

        await queryRunner.query(`CREATE TABLE IF NOT EXISTS etiquetas (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nombre TEXT NOT NULL,
            color TEXT,
            creado_en DATETIME DEFAULT (CURRENT_TIMESTAMP)
        );`);

        await queryRunner.query(`CREATE TABLE IF NOT EXISTS tareas (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            titulo TEXT NOT NULL,
            descripcion TEXT,
            estado TEXT NOT NULL DEFAULT 'PENDIENTE',
            prioridad INTEGER NOT NULL DEFAULT 2,
            fecha_vencimiento DATETIME NULL,
            creador_id INTEGER NOT NULL,
            asignada_a INTEGER,
            equipo_id INTEGER NOT NULL,
            creado_en DATETIME DEFAULT (CURRENT_TIMESTAMP),
            actualizado_en DATETIME DEFAULT (CURRENT_TIMESTAMP)
        );`);

        await queryRunner.query(`CREATE TABLE IF NOT EXISTS tareas_etiquetas (
            tarea_id INTEGER NOT NULL,
            etiqueta_id INTEGER NOT NULL,
            PRIMARY KEY (tarea_id, etiqueta_id)
        );`);

        await queryRunner.query(`CREATE TABLE IF NOT EXISTS comentarios (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            tarea_id INTEGER NOT NULL,
            autor_id INTEGER NOT NULL,
            contenido TEXT NOT NULL,
            creado_en DATETIME DEFAULT (CURRENT_TIMESTAMP)
        );`);

        await queryRunner.query(`CREATE TABLE IF NOT EXISTS historial_de_estados (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            tarea_id INTEGER NOT NULL,
            estado_anterior TEXT,
            estado_nuevo TEXT NOT NULL,
            cambiado_por INTEGER,
            cambiado_en DATETIME DEFAULT (CURRENT_TIMESTAMP)
        );`);

        await queryRunner.query(`CREATE TABLE IF NOT EXISTS actividad (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            equipo_id INTEGER,
            usuario_id INTEGER,
            tipo TEXT NOT NULL,
            descripcion TEXT,
            metadata TEXT,
            creado_en DATETIME DEFAULT (CURRENT_TIMESTAMP)
        );`);

        await queryRunner.query(`PRAGMA foreign_keys = ON;`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS actividad;`);
        await queryRunner.query(`DROP TABLE IF EXISTS historial_de_estados;`);
        await queryRunner.query(`DROP TABLE IF EXISTS comentarios;`);
        await queryRunner.query(`DROP TABLE IF EXISTS tareas_etiquetas;`);
        await queryRunner.query(`DROP TABLE IF EXISTS tareas;`);
        await queryRunner.query(`DROP TABLE IF EXISTS etiquetas;`);
        await queryRunner.query(`DROP TABLE IF EXISTS membresias;`);
        await queryRunner.query(`DROP TABLE IF EXISTS equipos;`);
        await queryRunner.query(`DROP TABLE IF EXISTS usuarios;`);
    }
}
