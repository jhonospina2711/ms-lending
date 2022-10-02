import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';

export class updateTargetDto {
  @IsString()
  @IsOptional()
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
  @IsOptional()
  @ApiProperty()
  readonly rate: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  readonly max: number;
}
