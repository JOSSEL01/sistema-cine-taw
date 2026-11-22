import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateClienteDto {
  @ApiProperty({ example: 'José Andrés', maxLength: 120 })
  @IsString()
  @IsNotEmpty()
  @MaxLength(120)
  nombres: string;

  @ApiProperty({ example: 'Mamani', maxLength: 120 })
  @IsString()
  @IsNotEmpty()
  @MaxLength(120)
  paterno: string;

  @ApiProperty({ example: 'Quispe', maxLength: 120 })
  @IsString()
  @IsNotEmpty()
  @MaxLength(120)
  materno: string;

  @ApiProperty({ example: 'jose.andres@ejemplo.com', maxLength: 150 })
  @IsEmail()
  @IsNotEmpty()
  @MaxLength(150)
  email: string;
}