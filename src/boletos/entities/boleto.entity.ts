import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import type { Funcion } from '../../funciones/entities/funcion.entity.js';
import type { Cliente } from '../../clientes/entities/cliente.entity.js';

@Entity('boletos')
export class Boleto {
  @PrimaryGeneratedColumn()
  idBoleto: number;

  @Column({ type: 'int' })
  idFuncion: number;

  @Column({ type: 'int' })
  idCliente: number;

  @Column({ type: 'int' })
  numeroAsiento: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  precioPagado: number;

  @ManyToOne('Funcion', 'boletos')
  @JoinColumn({ name: 'idFuncion', referencedColumnName: 'idFuncion' })
  funcion: Funcion;

  @ManyToOne('Cliente', 'boletos')
  @JoinColumn({ name: 'idCliente', referencedColumnName: 'idCliente' })
  cliente: Cliente;

  @CreateDateColumn({ name: 'creadoEn' })
  creadoEn: Date;

  @UpdateDateColumn({ name: 'actualizadoEn' })
  actualizadoEn: Date;

  @DeleteDateColumn({ name: 'eliminadoEn', nullable: true })
  eliminadoEn: Date | null;
}