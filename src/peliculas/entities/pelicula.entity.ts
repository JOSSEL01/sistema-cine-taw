import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import type { Genero } from '../../generos/entities/genero.entity.js';
import { Funcion } from '../../funciones/entities/funcion.entity.js';

@Entity('peliculas')
export class Pelicula {
  @PrimaryGeneratedColumn()
  idPelicula: number;

  @Column({ type: 'varchar', length: 160 })
  titulo: string;

  @Column({ type: 'varchar', length: 500 })
  sinopsis: string;

  @Column({ type: 'int' })
  duracionMin: number;

  @Column({ type: 'varchar', length: 20 })
  clasificacion: string; // 'ATP' | '+13' | '+18'

  @ManyToMany('Genero', 'peliculas')
  @JoinTable({
    name: 'pelicula_genero',
    joinColumn: { name: 'idPelicula', referencedColumnName: 'idPelicula' },
    inverseJoinColumn: { name: 'idGenero', referencedColumnName: 'idGenero' },
  })
  generos: Genero[];

  @OneToMany('Funcion', 'pelicula')
  funciones: Funcion[];

  @CreateDateColumn({ name: 'creadoEn' })
  creadoEn: Date;

  @UpdateDateColumn({ name: 'actualizadoEn' })
  actualizadoEn: Date;

  @DeleteDateColumn({ name: 'eliminadoEn', nullable: true })
  eliminadoEn: Date | null;
}