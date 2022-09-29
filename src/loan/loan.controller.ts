import { Body, Controller, HttpException, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { loanApplicationDto } from './dtos/loanApplication.dto';
import { LoanService } from './loan.service';

@ApiTags('Loan')
@Controller('v1/loan')
export class LoanController {
  constructor(private readonly loanService: LoanService) {}

  @Post('newLoan')
  @ApiBody({
    type: loanApplicationDto,
    examples: {
      one: {
        summary: 'Ejemplo Json registrar nuevo prestamo',
        value: {
          amount: 'Monto del préstamo.',
          term: 'Número de cuotas',
          user_id: 'Identificador del usuario',
        },
      },
    },
  })
  @ApiOperation({
    summary: 'Api para insertar un nuevo prestamo',
    description: 'Esta api permite el registro en base de datos de un prestamo',
  })
  async loanApplication(@Body() payload: loanApplicationDto) {
    try {
      return await this.loanService.loanApplication(payload);
    } catch (error) {
      throw new HttpException(`Se presento el siguiente error: ${error}`, 400);
    }
  }
}
