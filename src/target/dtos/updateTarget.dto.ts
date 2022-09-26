import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class updateTarget {
  // @IsNumber()
  // @IsNotEmpty()
  // readonly id: string;

  @IsString()
  @IsOptional()
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
  @IsOptional()
  readonly rate: number;

  @IsNumber()
  @IsOptional()
  readonly max: number;
}
