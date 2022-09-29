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
  readonly name: string;

  @IsNumber()
  @IsOptional()
  readonly min_cant: number;

  @IsNumber()
  @IsOptional()
  readonly max_cant: number;

  @IsNumber()
  @IsOptional()
  readonly min_amount_total: number;

  @IsNumber()
  @IsOptional()
  readonly max_amount_total: number;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  readonly rate: number;

  @IsNumber()
  @IsNotEmpty()
  readonly max: number;
}
