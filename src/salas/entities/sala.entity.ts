import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Funcion } from '../../funciones/entities/funcion.entity.js';

@Entity('salas')
export class Sala {
  @PrimaryGeneratedColumn()
  idSala: number;

  @Column({ type: 'varchar', length: 120 })
  nombre: string;

  @Column({ type: 'int' })
  capacidad: number;

  @Column({ type: 'varchar', length: 20 })
  tipo: string; // '2D' | '3D' | 'IMAX'

  @OneToMany('Funcion', 'sala')
  funciones: Funcion[];

  @CreateDateColumn({ name: 'creadoEn' })
  creadoEn: Date;

  @UpdateDateColumn({ name: 'actualizadoEn' })
  actualizadoEn: Date;

  @DeleteDateColumn({ name: 'eliminadoEn', nullable: true })
  eliminadoEn: Date | null;
}