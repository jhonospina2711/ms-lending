import { Body, Controller, HttpException, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { registerPaymentDto } from './dtos/registerPaymentDto';
import { PaymentService } from './payment.service';

@ApiTags('Payment')
@Controller('v1/payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('newPayment')
  @ApiBody({
    type: registerPaymentDto,
    examples: {
      one: {
        summary: 'Ejemplo Json de un nuevo pago',
        value: {
          amount: 'Monto del pago.',
          loan_id: 'Identificador del préstamo al cual va dirigido el pago.',
        },
      },
    },
  })
  @ApiOperation({
    summary: 'Api para insertar un nuevo pago',
    description: 'Esta api permite el registro en base de datos de un pago',
  })
  async registerPayment(@Body() payload: registerPaymentDto) {
    try {
      return await this.paymentService.registerPayment(payload);
    } catch (error) {
      throw new HttpException(`Se presento el siguiente error: ${error}`, 400);
    }
  }
}
