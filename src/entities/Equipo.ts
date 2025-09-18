import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "equipos" })
export class Equipo {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nombre!: string;

  @Column()
  creado_por!: number;

  @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
  creado_en!: string;
}
