import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDateString, IsInt, IsNotEmpty, IsNumber, Min } from 'class-validator';

export class CreateFuncionDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  @Min(1)
  idSala: number;

  @ApiProperty({ example: 1 })
  @IsInt()
  @Min(1)
  idPelicula: number;

  @ApiProperty({ example: '2026-11-25T19:30:00.000Z' })
  @IsDateString()
  @IsNotEmpty()
  fechaHora: string;

  @ApiProperty({ example: 45.0, minimum: 0 })
  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  precio: number;
}