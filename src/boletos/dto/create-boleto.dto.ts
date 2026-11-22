import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsNumber, IsOptional, Min } from 'class-validator';

export class CreateBoletoDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  @Min(1)
  idFuncion: number;

  @ApiProperty({ example: 1 })
  @IsInt()
  @Min(1)
  idCliente: number;

  @ApiProperty({ example: 15, minimum: 1 })
  @IsInt()
  @Min(1)
  numeroAsiento: number;

  @ApiPropertyOptional({
    example: 45.0,
    description: 'Si se omite, se toma automáticamente el precio de la función',
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  precioPagado?: number;
}