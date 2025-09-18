import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "actividad" })
export class Actividad {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  equipo_id!: number;

  @Column({ nullable: true })
  usuario_id!: number;

  @Column()
  tipo!: string;

  @Column({ type: "text", nullable: true })
  descripcion!: string;

  @Column({ type: "text", nullable: true })
  metadata!: string;

  @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
  creado_en!: string;
}
