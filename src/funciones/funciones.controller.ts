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
import { FuncionesService } from './funciones.service.js';
import { CreateFuncionDto } from './dto/create-funcion.dto.js';
import { UpdateFuncionDto } from './dto/update-funcion.dto.js';

@ApiTags('Funciones')
@Controller('funciones')
export class FuncionesController {
  constructor(private readonly funcionesService: FuncionesService) {}

  @Post()
  @ApiOperation({ summary: 'Programar una nueva función en una sala' })
  @ApiResponse({ status: 201, description: 'Función creada exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos' })
  @ApiResponse({ status: 404, description: 'Sala o película no encontrada' })
  create(@Body() createFuncionDto: CreateFuncionDto) {
    return this.funcionesService.create(createFuncionDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas las funciones con su sala y película' })
  @ApiResponse({ status: 200, description: 'Listado de funciones' })
  findAll() {
    return this.funcionesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una función por ID con su sala y película' })
  @ApiResponse({ status: 200, description: 'Función encontrada' })
  @ApiResponse({ status: 404, description: 'Función no encontrada' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.funcionesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una función por ID' })
  @ApiResponse({ status: 200, description: 'Función actualizada' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @ApiResponse({ status: 404, description: 'Función, sala o película no encontrada' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateFuncionDto: UpdateFuncionDto,
  ) {
    return this.funcionesService.update(id, updateFuncionDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar lógicamente una función por ID' })
  @ApiResponse({ status: 200, description: 'Función eliminada (soft delete)' })
  @ApiResponse({ status: 404, description: 'Función no encontrada' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.funcionesService.remove(id);
  }
}