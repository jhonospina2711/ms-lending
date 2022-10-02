import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class loanApplicationDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  readonly amount: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  readonly term: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  readonly user_id: number;
}
