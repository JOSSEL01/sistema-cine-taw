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
import { PeliculasService } from './peliculas.service.js';
import { CreatePeliculaDto } from './dto/create-pelicula.dto.js';
import { UpdatePeliculaDto } from './dto/update-pelicula.dto.js';

@ApiTags('Peliculas')
@Controller('peliculas')
export class PeliculasController {
  constructor(private readonly peliculasService: PeliculasService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva película (opcionalmente con géneros)' })
  @ApiResponse({ status: 201, description: 'Película creada exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos' })
  @ApiResponse({ status: 404, description: 'Algún género indicado no existe' })
  create(@Body() createPeliculaDto: CreatePeliculaDto) {
    return this.peliculasService.create(createPeliculaDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas las películas activas con sus géneros' })
  @ApiResponse({ status: 200, description: 'Listado de películas' })
  findAll() {
    return this.peliculasService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una película por ID con sus géneros' })
  @ApiResponse({ status: 200, description: 'Película encontrada' })
  @ApiResponse({ status: 404, description: 'Película no encontrada' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.peliculasService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una película por ID (y/o reemplazar sus géneros)' })
  @ApiResponse({ status: 200, description: 'Película actualizada' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @ApiResponse({ status: 404, description: 'Película o género no encontrado' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePeliculaDto: UpdatePeliculaDto,
  ) {
    return this.peliculasService.update(id, updatePeliculaDto);
  }

  @Post(':id/generos/:generoId')
  @ApiOperation({ summary: 'Asignar un género a una película' })
  @ApiResponse({ status: 200, description: 'Género asignado a la película' })
  @ApiResponse({ status: 404, description: 'Película o género no encontrado' })
  addGenero(
    @Param('id', ParseIntPipe) id: number,
    @Param('generoId', ParseIntPipe) generoId: number,
  ) {
    return this.peliculasService.addGenero(id, generoId);
  }

  @Delete(':id/generos/:generoId')
  @ApiOperation({ summary: 'Quitar un género de una película' })
  @ApiResponse({ status: 200, description: 'Género quitado de la película' })
  @ApiResponse({ status: 404, description: 'Película no encontrada' })
  removeGenero(
    @Param('id', ParseIntPipe) id: number,
    @Param('generoId', ParseIntPipe) generoId: number,
  ) {
    return this.peliculasService.removeGenero(id, generoId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar lógicamente una película por ID' })
  @ApiResponse({ status: 200, description: 'Película eliminada (soft delete)' })
  @ApiResponse({ status: 404, description: 'Película no encontrada' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.peliculasService.remove(id);
  }
}