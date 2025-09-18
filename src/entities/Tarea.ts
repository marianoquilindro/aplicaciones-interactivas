import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "tareas" })
export class Tarea {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  titulo!: string;

  @Column({ type: "text", nullable: true })
  descripcion!: string;

  @Column({ default: "PENDIENTE" })
  estado!: string;

  @Column({ default: 2 })
  prioridad!: number;

  @Column({ type: "datetime", nullable: true })
  fecha_vencimiento!: string | null;

  @Column()
  creador_id!: number;

  @Column({ nullable: true })
  asignada_a!: number;

  @Column()
  equipo_id!: number;

  @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
  creado_en!: string;

  @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
  actualizado_en!: string;
}
