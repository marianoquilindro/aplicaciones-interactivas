import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "usuarios" })
export class Usuario {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nombre!: string;

  @Column({ unique: true })
  correo!: string;

  @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
  creado_en!: string;
}
