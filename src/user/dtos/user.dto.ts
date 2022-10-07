import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class createUserDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description: 'Identificador del tipo de documento',
    required: true,
  })
  readonly documentTypeId: number;

  @IsNotEmpty()
  @ApiProperty({
    description: 'Documento de identididad del usuario',
    required: true,
  })
  readonly document: string;

  @IsNotEmpty()
  @ApiProperty({
    description: 'Nombres del usuario',
    required: true,
  })
  readonly name: string;

  @IsNotEmpty()
  @ApiProperty({
    description: 'Apellidos del usuario',
    required: true,
  })
  readonly last_name: string;

  @IsNotEmpty()
  @ApiProperty({
    description: 'Correo electronico del usuario',
    required: true,
  })
  readonly email: string;

  @IsNotEmpty()
  @ApiProperty({
    description: 'Número de celular',
    required: true,
  })
  readonly cel_phone: string;

  @IsNotEmpty()
  @ApiProperty({
    description: 'Fecha de nacimiento',
    required: true,
  })
  readonly birth_date?: Date;
}
