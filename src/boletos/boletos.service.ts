import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { Boleto } from './entities/boleto.entity.js';
import { Funcion } from '../funciones/entities/funcion.entity.js';
import { Cliente } from '../clientes/entities/cliente.entity.js';
import { Sala } from '../salas/entities/sala.entity.js';
import { CreateBoletoDto } from './dto/create-boleto.dto.js';
import { UpdateBoletoDto } from './dto/update-boleto.dto.js';

@Injectable()
export class BoletosService {
  constructor(
    @InjectRepository(Boleto)
    private readonly boletoRepo: Repository<Boleto>,
    @InjectRepository(Funcion)
    private readonly funcionRepo: Repository<Funcion>,
    @InjectRepository(Cliente)
    private readonly clienteRepo: Repository<Cliente>,
    @InjectRepository(Sala)
    private readonly salaRepo: Repository<Sala>,
  ) {}

  private async validarReglasBoleto(params: {
    idFuncion: number;
    idCliente: number;
    numeroAsiento: number;
    excludeBoletoId?: number;
  }): Promise<{ funcion: Funcion; cliente: Cliente }> {
    const { idFuncion, idCliente, numeroAsiento, excludeBoletoId } = params;

    const funcion = await this.funcionRepo.findOne({
      where: { idFuncion },
      relations: { sala: true, pelicula: true },
    });
    if (!funcion) {
      throw new NotFoundException(`No se encontró la función con id ${idFuncion}`);
    }

    const cliente = await this.clienteRepo.findOne({
      where: { idCliente },
    });
    if (!cliente) {
      throw new NotFoundException(`No se encontró el cliente con id ${idCliente}`);
    }

    const sala =
      funcion.sala ??
      (await this.salaRepo.findOne({ where: { idSala: funcion.idSala } }));

    if (!sala) {
      throw new NotFoundException(
        `No se encontró la sala asociada a la función con id ${idFuncion}`,
      );
    }

    if (numeroAsiento < 1 || numeroAsiento > sala.capacidad) {
      throw new BadRequestException(
        `El número de asiento ${numeroAsiento} está fuera del rango permitido (1 a ${sala.capacidad}) para la sala "${sala.nombre}"`,
      );
    }

    const boletoOcupado = await this.boletoRepo.findOne({
      where: {
        idFuncion,
        numeroAsiento,
        ...(excludeBoletoId !== undefined
          ? { idBoleto: Not(excludeBoletoId) }
          : {}),
      },
    });

    if (boletoOcupado) {
      throw new BadRequestException(
        `El asiento ${numeroAsiento} ya está ocupado para la función con id ${idFuncion}`,
      );
    }

    return { funcion, cliente };
  }

  async create(createBoletoDto: CreateBoletoDto): Promise<Boleto> {
    const { funcion } = await this.validarReglasBoleto({
      idFuncion: createBoletoDto.idFuncion,
      idCliente: createBoletoDto.idCliente,
      numeroAsiento: createBoletoDto.numeroAsiento,
    });

    const precioFinal =
      createBoletoDto.precioPagado !== undefined
        ? createBoletoDto.precioPagado
        : Number(funcion.precio);

    const boleto = this.boletoRepo.create({
      idFuncion: createBoletoDto.idFuncion,
      idCliente: createBoletoDto.idCliente,
      numeroAsiento: createBoletoDto.numeroAsiento,
      precioPagado: precioFinal,
    });

    const guardado = await this.boletoRepo.save(boleto);
    return await this.findOne(guardado.idBoleto);
  }

  async findAll(): Promise<Boleto[]> {
    return await this.boletoRepo.find({
      relations: {
        funcion: {
          sala: true,
          pelicula: true,
        },
        cliente: true,
      },
      order: { idBoleto: 'ASC' },
    });
  }

  async findOne(id: number): Promise<Boleto> {
    const boleto = await this.boletoRepo.findOne({
      where: { idBoleto: id },
      relations: {
        funcion: {
          sala: true,
          pelicula: true,
        },
        cliente: true,
      },
    });
    if (!boleto) {
      throw new NotFoundException(`No se encontró el boleto con id ${id}`);
    }
    return boleto;
  }

  async update(
    id: number,
    updateBoletoDto: UpdateBoletoDto,
  ): Promise<Boleto> {
    const actual = await this.findOne(id);

    const nextIdFuncion = updateBoletoDto.idFuncion ?? actual.idFuncion;
    const nextIdCliente = updateBoletoDto.idCliente ?? actual.idCliente;
    const nextNumeroAsiento =
      updateBoletoDto.numeroAsiento ?? actual.numeroAsiento;

    await this.validarReglasBoleto({
      idFuncion: nextIdFuncion,
      idCliente: nextIdCliente,
      numeroAsiento: nextNumeroAsiento,
      excludeBoletoId: id,
    });

    if (updateBoletoDto.idFuncion !== undefined) {
      actual.idFuncion = updateBoletoDto.idFuncion;
    }
    if (updateBoletoDto.idCliente !== undefined) {
      actual.idCliente = updateBoletoDto.idCliente;
    }
    if (updateBoletoDto.numeroAsiento !== undefined) {
      actual.numeroAsiento = updateBoletoDto.numeroAsiento;
    }
    if (updateBoletoDto.precioPagado !== undefined) {
      actual.precioPagado = updateBoletoDto.precioPagado;
    }

    await this.boletoRepo.save(actual);
    return await this.findOne(id);
  }

  async remove(id: number): Promise<{ message: string }> {
    await this.findOne(id);
    await this.boletoRepo.softDelete(id);
    return { message: `Boleto con id ${id} eliminado correctamente` };
  }
}