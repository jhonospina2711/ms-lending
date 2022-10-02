import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty } from 'class-validator';

export class getListAllLoanDto {
  //@IsDate()
  @ApiProperty({ example: '2021-01-10 05:00:00.000', required: true })
  readonly from: Date;

  //@IsDate()
  @ApiProperty({ example: '2022-01-10 05:00:00.000', required: true })
  readonly to: Date;
}
