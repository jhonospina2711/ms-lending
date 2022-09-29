import { IsNotEmpty, IsNumber } from 'class-validator';

export class loanApplicationDto {
  @IsNumber()
  @IsNotEmpty()
  readonly amount: number;

  @IsNumber()
  @IsNotEmpty()
  readonly term: number;

  @IsNumber()
  @IsNotEmpty()
  readonly user_id: number;
}
