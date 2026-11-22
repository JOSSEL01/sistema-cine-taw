import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import type { Boleto } from '../../boletos/entities/boleto.entity.js';

@Entity('clientes')
export class Cliente {
  @PrimaryGeneratedColumn()
  idCliente: number;

  @Column({ type: 'varchar', length: 120 })
  nombres: string;

  @Column({ type: 'varchar', length: 120 })
  paterno: string;

  @Column({ type: 'varchar', length: 120 })
  materno: string;

  @Column({ type: 'varchar', length: 150 })
  email: string;

  @OneToMany('Boleto', 'cliente')
  boletos: Boleto[];

  @CreateDateColumn({ name: 'creadoEn' })
  creadoEn: Date;

  @UpdateDateColumn({ name: 'actualizadoEn' })
  actualizadoEn: Date;

  @DeleteDateColumn({ name: 'eliminadoEn', nullable: true })
  eliminadoEn: Date | null;
}