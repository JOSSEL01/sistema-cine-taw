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
import { BoletosService } from './boletos.service.js';
import { CreateBoletoDto } from './dto/create-boleto.dto.js';
import { UpdateBoletoDto } from './dto/update-boleto.dto.js';

@ApiTags('Boletos')
@Controller('boletos')
export class BoletosController {
  constructor(private readonly boletosService: BoletosService) {}

  @Post()
  @ApiOperation({ summary: 'Vender / emitir un nuevo boleto para una función' })
  @ApiResponse({ status: 201, description: 'Boleto emitido exitosamente' })
  @ApiResponse({
    status: 400,
    description: 'Asiento fuera de capacidad o ya ocupado',
  })
  @ApiResponse({ status: 404, description: 'Función o cliente no encontrado' })
  create(@Body() createBoletoDto: CreateBoletoDto) {
    return this.boletosService.create(createBoletoDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Listar todos los boletos con función (sala y película) y cliente',
  })
  @ApiResponse({ status: 200, description: 'Listado de boletos' })
  findAll() {
    return this.boletosService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Obtener un boleto por ID con función (sala y película) y cliente',
  })
  @ApiResponse({ status: 200, description: 'Boleto encontrado' })
  @ApiResponse({ status: 404, description: 'Boleto no encontrado' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.boletosService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un boleto por ID' })
  @ApiResponse({ status: 200, description: 'Boleto actualizado' })
  @ApiResponse({
    status: 400,
    description: 'Asiento fuera de capacidad o ya ocupado',
  })
  @ApiResponse({
    status: 404,
    description: 'Boleto, función o cliente no encontrado',
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBoletoDto: UpdateBoletoDto,
  ) {
    return this.boletosService.update(id, updateBoletoDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar lógicamente un boleto por ID' })
  @ApiResponse({ status: 200, description: 'Boleto eliminado (soft delete)' })
  @ApiResponse({ status: 404, description: 'Boleto no encontrado' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.boletosService.remove(id);
  }
}