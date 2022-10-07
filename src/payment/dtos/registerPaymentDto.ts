import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class registerPaymentDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description:
      'Monto del pago realizado (puede ser inferior o superior al monto de la cuota mensual)',
    required: true,
  })
  readonly amount: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ required: true })
  readonly loan_id: number;
}
