import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import type { Sala } from '../../salas/entities/sala.entity.js';
import type { Pelicula } from '../../peliculas/entities/pelicula.entity.js';
import type { Boleto } from '../../boletos/entities/boleto.entity.js';

@Entity('funciones')
export class Funcion {
  @PrimaryGeneratedColumn()
  idFuncion: number;

  @Column({ type: 'int' })
  idSala: number;

  @Column({ type: 'int' })
  idPelicula: number;

  @Column({ type: 'timestamp' })
  fechaHora: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  precio: number;

  @ManyToOne('Sala', 'funciones')
  @JoinColumn({ name: 'idSala', referencedColumnName: 'idSala' })
  sala: Sala;

  @ManyToOne('Pelicula', 'funciones')
  @JoinColumn({ name: 'idPelicula', referencedColumnName: 'idPelicula' })
  pelicula: Pelicula;

  @OneToMany('Boleto', 'funcion')
  boletos: Boleto[];

  @CreateDateColumn({ name: 'creadoEn' })
  creadoEn: Date;

  @UpdateDateColumn({ name: 'actualizadoEn' })
  actualizadoEn: Date;

  @DeleteDateColumn({ name: 'eliminadoEn', nullable: true })
  eliminadoEn: Date | null;
}