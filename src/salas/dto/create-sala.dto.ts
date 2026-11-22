import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsInt, IsNotEmpty, IsString, MaxLength, Min } from 'class-validator';

export class CreateSalaDto {
  @ApiProperty({ example: 'Sala Principal 1', maxLength: 120 })
  @IsString()
  @IsNotEmpty()
  @MaxLength(120)
  nombre: string;

  @ApiProperty({ example: 120, minimum: 1 })
  @IsInt()
  @Min(1)
  capacidad: number;

  @ApiProperty({ example: 'IMAX', enum: ['2D', '3D', 'IMAX'] })
  @IsString()
  @IsIn(['2D', '3D', 'IMAX'])
  tipo: string;
}