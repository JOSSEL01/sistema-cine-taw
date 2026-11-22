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
import { GenerosService } from './generos.service.js';
import { CreateGeneroDto } from './dto/create-genero.dto.js';
import { UpdateGeneroDto } from './dto/update-genero.dto.js';

@ApiTags('Generos')
@Controller('generos')
export class GenerosController {
  constructor(private readonly generosService: GenerosService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo género cinematográfico' })
  @ApiResponse({ status: 201, description: 'Género creado exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos' })
  create(@Body() createGeneroDto: CreateGeneroDto) {
    return this.generosService.create(createGeneroDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos los géneros activos' })
  @ApiResponse({ status: 200, description: 'Listado de géneros' })
  findAll() {
    return this.generosService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un género por ID' })
  @ApiResponse({ status: 200, description: 'Género encontrado' })
  @ApiResponse({ status: 404, description: 'Género no encontrado' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.generosService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un género por ID' })
  @ApiResponse({ status: 200, description: 'Género actualizado' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @ApiResponse({ status: 404, description: 'Género no encontrado' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateGeneroDto: UpdateGeneroDto,
  ) {
    return this.generosService.update(id, updateGeneroDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar lógicamente un género por ID' })
  @ApiResponse({ status: 200, description: 'Género eliminado (soft delete)' })
  @ApiResponse({ status: 404, description: 'Género no encontrado' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.generosService.remove(id);
  }
}