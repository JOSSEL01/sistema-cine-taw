import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Pelicula } from './entities/pelicula.entity.js';
import { Genero } from '../generos/entities/genero.entity.js';
import { CreatePeliculaDto } from './dto/create-pelicula.dto.js';
import { UpdatePeliculaDto } from './dto/update-pelicula.dto.js';

@Injectable()
export class PeliculasService {
  constructor(
    @InjectRepository(Pelicula)
    private readonly peliculaRepo: Repository<Pelicula>,
    @InjectRepository(Genero)
    private readonly generoRepo: Repository<Genero>,
  ) {}

  private async buscarGenerosPorIds(generoIds: number[]): Promise<Genero[]> {
    if (generoIds.length === 0) {
      return [];
    }
    const unicos = [...new Set(generoIds)];
    const generos = await this.generoRepo.find({
      where: { idGenero: In(unicos) },
    });
    if (generos.length !== unicos.length) {
      const encontrados = new Set(generos.map((g) => g.idGenero));
      const faltantes = unicos.filter((id) => !encontrados.has(id));
      throw new NotFoundException(
        `No se encontraron los géneros con id: ${faltantes.join(', ')}`,
      );
    }
    return generos;
  }

  async create(createPeliculaDto: CreatePeliculaDto): Promise<Pelicula> {
    const { generoIds, ...datosPelicula } = createPeliculaDto;
    const pelicula = this.peliculaRepo.create(datosPelicula);

    if (generoIds !== undefined) {
      pelicula.generos = await this.buscarGenerosPorIds(generoIds);
    }

    const guardada = await this.peliculaRepo.save(pelicula);
    return await this.findOne(guardada.idPelicula);
  }

  async findAll(): Promise<Pelicula[]> {
    return await this.peliculaRepo.find({
      relations: { generos: true },
      order: { idPelicula: 'ASC' },
    });
  }

  async findOne(id: number): Promise<Pelicula> {
    const pelicula = await this.peliculaRepo.findOne({
      where: { idPelicula: id },
      relations: { generos: true, funciones: true },
    });
    if (!pelicula) {
      throw new NotFoundException(`No se encontró la película con id ${id}`);
    }
    return pelicula;
  }

  async update(
    id: number,
    updatePeliculaDto: UpdatePeliculaDto,
  ): Promise<Pelicula> {
    const { generoIds, ...datosPelicula } = updatePeliculaDto;
    const pelicula = await this.findOne(id);

    Object.assign(pelicula, datosPelicula);

    if (generoIds !== undefined) {
      pelicula.generos = await this.buscarGenerosPorIds(generoIds);
    }

    await this.peliculaRepo.save(pelicula);
    return await this.findOne(id);
  }

  async addGenero(id: number, generoId: number): Promise<Pelicula> {
    const pelicula = await this.findOne(id);
    const genero = await this.generoRepo.findOne({
      where: { idGenero: generoId },
    });
    if (!genero) {
      throw new NotFoundException(`No se encontró el género con id ${generoId}`);
    }

    pelicula.generos = pelicula.generos ?? [];
    const yaAsignado = pelicula.generos.some((g) => g.idGenero === generoId);
    if (!yaAsignado) {
      pelicula.generos.push(genero);
      await this.peliculaRepo.save(pelicula);
    }

    return await this.findOne(id);
  }

  async removeGenero(id: number, generoId: number): Promise<Pelicula> {
    const pelicula = await this.findOne(id);
    pelicula.generos = (pelicula.generos ?? []).filter(
      (g) => g.idGenero !== generoId,
    );
    await this.peliculaRepo.save(pelicula);
    return await this.findOne(id);
  }

  async remove(id: number): Promise<{ message: string }> {
    await this.findOne(id);
    await this.peliculaRepo.softDelete(id);
    return { message: `Película con id ${id} eliminada correctamente` };
  }
}