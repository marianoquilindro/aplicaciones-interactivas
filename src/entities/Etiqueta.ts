import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "etiquetas" })
export class Etiqueta {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nombre!: string;

  @Column({ nullable: true })
  color!: string;

  @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
  creado_en!: string;
}