import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sala } from './entities/sala.entity.js';
import { CreateSalaDto } from './dto/create-sala.dto.js';
import { UpdateSalaDto } from './dto/update-sala.dto.js';

@Injectable()
export class SalasService {
  constructor(
    @InjectRepository(Sala)
    private readonly salaRepo: Repository<Sala>,
  ) {}

  async create(createSalaDto: CreateSalaDto): Promise<Sala> {
    const sala = this.salaRepo.create(createSalaDto);
    return await this.salaRepo.save(sala);
  }

  async findAll(): Promise<Sala[]> {
    return await this.salaRepo.find({
      order: { idSala: 'ASC' },
    });
  }

  async findOne(id: number): Promise<Sala> {
  const sala = await this.salaRepo.findOne({
      where: { idSala: id },
      relations: { funciones: true },
    });
    if (!sala) {
      throw new NotFoundException(`No se encontró la sala con id ${id}`);
    }
    return sala;
  }

  async update(id: number, updateSalaDto: UpdateSalaDto): Promise<Sala> {
    const sala = await this.findOne(id);
    Object.assign(sala, updateSalaDto);
    return await this.salaRepo.save(sala);
  }

  async remove(id: number): Promise<{ message: string }> {
    await this.findOne(id);
    await this.salaRepo.softDelete(id);
    return { message: `Sala con id ${id} eliminada correctamente` };
  }
}