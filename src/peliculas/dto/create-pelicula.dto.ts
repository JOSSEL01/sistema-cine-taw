import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

export class CreatePeliculaDto {
  @ApiProperty({ example: 'Interestelar', maxLength: 160 })
  @IsString()
  @IsNotEmpty()
  @MaxLength(160)
  titulo: string;

  @ApiProperty({
    example: 'Un grupo de astronautas viaja a través de un agujero de gusano en busca de un nuevo hogar para la humanidad.',
    maxLength: 500,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(500)
  sinopsis: string;

  @ApiProperty({ example: 169, minimum: 1 })
  @IsInt()
  @Min(1)
  duracionMin: number;

  @ApiProperty({ example: '+13', enum: ['ATP', '+13', '+18'] })
  @IsString()
  @IsIn(['ATP', '+13', '+18'])
  clasificacion: string;

  @ApiPropertyOptional({ example: [1, 2], type: [Number] })
  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  generoIds?: number[];
}