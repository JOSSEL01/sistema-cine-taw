import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Genero } from './entities/genero.entity.js';
import { CreateGeneroDto } from './dto/create-genero.dto.js';
import { UpdateGeneroDto } from './dto/update-genero.dto.js';

@Injectable()
export class GenerosService {
  constructor(
    @InjectRepository(Genero)
    private readonly generoRepo: Repository<Genero>,
  ) {}

  async create(createGeneroDto: CreateGeneroDto): Promise<Genero> {
    const genero = this.generoRepo.create(createGeneroDto);
    return await this.generoRepo.save(genero);
  }

  async findAll(): Promise<Genero[]> {
    return await this.generoRepo.find({
      order: { idGenero: 'ASC' },
    });
  }

  async findOne(id: number): Promise<Genero> {
    const genero = await this.generoRepo.findOne({
      where: { idGenero: id },
      relations: { peliculas: true },
    });
    if (!genero) {
      throw new NotFoundException(`No se encontró el género con id ${id}`);
    }
    return genero;
  }

  async update(id: number, updateGeneroDto: UpdateGeneroDto): Promise<Genero> {
    const genero = await this.findOne(id);
    Object.assign(genero, updateGeneroDto);
    return await this.generoRepo.save(genero);
  }

  async remove(id: number): Promise<{ message: string }> {
    await this.findOne(id);
    await this.generoRepo.softDelete(id);
    return { message: `Género con id ${id} eliminado correctamente` };
  }
}