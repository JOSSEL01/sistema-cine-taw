import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import type { Pelicula } from '../../peliculas/entities/pelicula.entity.js';

@Entity('generos')
export class Genero {
  @PrimaryGeneratedColumn()
  idGenero: number;

  @Column({ type: 'varchar', length: 100 })
  nombre: string;

  @Column({ type: 'varchar', length: 255 })
  descripcion: string;

  @ManyToMany('Pelicula', 'generos')
  peliculas: Pelicula[];

  @CreateDateColumn({ name: 'creadoEn' })
  creadoEn: Date;

  @UpdateDateColumn({ name: 'actualizadoEn' })
  actualizadoEn: Date;

  @DeleteDateColumn({ name: 'eliminadoEn', nullable: true })
  eliminadoEn: Date | null;
}