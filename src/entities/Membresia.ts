import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "membresias" })
export class Membresia {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  equipo_id!: number;

  @Column()
  usuario_id!: number;

  @Column()
  rol!: string;

  @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
  agregado_en!: string;
} 