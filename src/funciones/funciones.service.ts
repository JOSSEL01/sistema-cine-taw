import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Funcion } from './entities/funcion.entity.js';
import { Sala } from '../salas/entities/sala.entity.js';
import { Pelicula } from '../peliculas/entities/pelicula.entity.js';
import { CreateFuncionDto } from './dto/create-funcion.dto.js';
import { UpdateFuncionDto } from './dto/update-funcion.dto.js';

@Injectable()
export class FuncionesService {
  constructor(
    @InjectRepository(Funcion)
    private readonly funcionRepo: Repository<Funcion>,
    @InjectRepository(Sala)
    private readonly salaRepo: Repository<Sala>,
    @InjectRepository(Pelicula)
    private readonly peliculaRepo: Repository<Pelicula>,
  ) {}

  private async validarSalaYPelicula(
    idSala: number,
    idPelicula: number,
  ): Promise<void> {
    const sala = await this.salaRepo.findOne({ where: { idSala } });
    if (!sala) {
      throw new NotFoundException(`No se encontró la sala con id ${idSala}`);
    }

    const pelicula = await this.peliculaRepo.findOne({ where: { idPelicula } });
    if (!pelicula) {
      throw new NotFoundException(
        `No se encontró la película con id ${idPelicula}`,
      );
    }
  }

  async create(createFuncionDto: CreateFuncionDto): Promise<Funcion> {
    await this.validarSalaYPelicula(
      createFuncionDto.idSala,
      createFuncionDto.idPelicula,
    );

    const funcion = this.funcionRepo.create({
      ...createFuncionDto,
      fechaHora: new Date(createFuncionDto.fechaHora),
    });

    const guardada = await this.funcionRepo.save(funcion);
    return await this.findOne(guardada.idFuncion);
  }

  async findAll(): Promise<Funcion[]> {
    return await this.funcionRepo.find({
      relations: { sala: true, pelicula: true },
      order: { idFuncion: 'ASC' },
    });
  }

  async findOne(id: number): Promise<Funcion> {
    const funcion = await this.funcionRepo.findOne({
      where: { idFuncion: id },
      relations: { sala: true, pelicula: true, boletos: true },
    });
    if (!funcion) {
      throw new NotFoundException(`No se encontró la función con id ${id}`);
    }
    return funcion;
  }

  async update(
    id: number,
    updateFuncionDto: UpdateFuncionDto,
  ): Promise<Funcion> {
    const funcion = await this.findOne(id);

    const nextIdSala = updateFuncionDto.idSala ?? funcion.idSala;
    const nextIdPelicula = updateFuncionDto.idPelicula ?? funcion.idPelicula;

    if (
      updateFuncionDto.idSala !== undefined ||
      updateFuncionDto.idPelicula !== undefined
    ) {
      await this.validarSalaYPelicula(nextIdSala, nextIdPelicula);
    }

    if (updateFuncionDto.fechaHora !== undefined) {
      funcion.fechaHora = new Date(updateFuncionDto.fechaHora);
    }
    if (updateFuncionDto.idSala !== undefined) {
      funcion.idSala = updateFuncionDto.idSala;
    }
    if (updateFuncionDto.idPelicula !== undefined) {
      funcion.idPelicula = updateFuncionDto.idPelicula;
    }
    if (updateFuncionDto.precio !== undefined) {
      funcion.precio = updateFuncionDto.precio;
    }

    await this.funcionRepo.save(funcion);
    return await this.findOne(id);
  }

  async remove(id: number): Promise<{ message: string }> {
    await this.findOne(id);
    await this.funcionRepo.softDelete(id);
    return { message: `Función con id ${id} eliminada correctamente` };
  }
}