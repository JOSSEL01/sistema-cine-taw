import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SalasService } from './salas.service.js';
import { CreateSalaDto } from './dto/create-sala.dto.js';
import { UpdateSalaDto } from './dto/update-sala.dto.js';

@ApiTags('Salas')
@Controller('salas')
export class SalasController {
  constructor(private readonly salasService: SalasService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva sala' })
  @ApiResponse({ status: 201, description: 'Sala creada exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos' })
  create(@Body() createSalaDto: CreateSalaDto) {
    return this.salasService.create(createSalaDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas las salas activas' })
  @ApiResponse({ status: 200, description: 'Listado de salas' })
  findAll() {
    return this.salasService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una sala por ID' })
  @ApiResponse({ status: 200, description: 'Sala encontrada' })
  @ApiResponse({ status: 404, description: 'Sala no encontrada' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.salasService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una sala por ID' })
  @ApiResponse({ status: 200, description: 'Sala actualizada' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @ApiResponse({ status: 404, description: 'Sala no encontrada' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSalaDto: UpdateSalaDto,
  ) {
    return this.salasService.update(id, updateSalaDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar lógicamente una sala por ID' })
  @ApiResponse({ status: 200, description: 'Sala eliminada (soft delete)' })
  @ApiResponse({ status: 404, description: 'Sala no encontrada' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.salasService.remove(id);
  }
}