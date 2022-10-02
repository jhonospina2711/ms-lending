import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class createTargetDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly name: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  readonly min_cant: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  readonly max_cant: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  readonly min_amount_total: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  readonly max_amount_total: number;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  @ApiProperty()
  readonly rate: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  readonly max: number;
}
