import { BadRequestException, Injectable } from '@nestjs/common';
import { Payment } from '@prisma/client';
import { ERROR_SAVE_PAYMENT } from 'src/common/constans/string';
import {
  responseError,
  responseSuccess,
} from '../common/httpResponse.interface';
import { PrismaService } from 'src/prisma/prisma.service';
import { registerPaymentDto } from './dtos/registerPaymentDto';
import { payment } from '../payment/interface';

@Injectable()
export class PaymentService {
  constructor(private readonly prismaService: PrismaService) {}

  async registerPayment(payload: registerPaymentDto): Promise<
    | {
        status: boolean;
        message: string;
      }
    | {
        status: boolean;
        data: any;
      }
  > {
    try {
      const debt = await this.getDebtAmount(payload.loan_id, payload.amount);
      if (Number.isNaN(debt)) {
        const balancePayable = await this.getLastPaymentMade(payload.loan_id);
        if (balancePayable > 0) {
          const response = {
            status: false,
            message: `El valor del pago: ${payload.amount}, es superior al saldo del credito: ${balancePayable}. Por favor haga el pago exacto!`,
          };
          return responseError(response.message, response.status);
        }
        const response = {
          status: false,
          message: `El saldo del crédito es ${balancePayable}, no se reciben mas pagos para el crédito Id: ${payload.loan_id}`,
        };
        return responseError(response.message, response.status);
      }
      const installment = await this.getInstallmentLoan(payload.loan_id);
      const payment: payment = {
        loan_id: payload.loan_id,
        amount: payload.amount,
        debt: debt,
        date: new Date(),
        installment: installment,
      };
      const savePayment = await this.saveNewPayment(payment);
      const response = {
        success: true,
        data: {
          id: savePayment['id'],
          loan_id: savePayment['loan_id'],
          debt: Number(savePayment['debt']),
        },
      };
      return responseSuccess(response.data, response.success);
    } catch (error) {
      throw new BadRequestException(ERROR_SAVE_PAYMENT);
    }
  }

  async getDebtAmount(loan_id: number, amount: number): Promise<number> {
    try {
      const sum = await this.prismaService.payment.groupBy({
        by: ['loan_id'],
        where: {
          loan_id: loan_id,
        },
        _sum: {
          amount: true,
        },
      });
      const sumPayment =
        sum.length > 0
          ? parseFloat(
              (Number(sum[0]._sum['amount']) + Number(amount)).toFixed(2),
            )
          : amount;
      const loan = await this.prismaService.loan.findUnique({
        where: {
          id: loan_id,
        },
        select: {
          amount: true,
        },
      });
      const amountLoan = parseFloat(Number(loan.amount).toFixed(2));
      const debt =
        amountLoan - sumPayment >= 0
          ? parseFloat(Number(amountLoan - sumPayment).toFixed(2))
          : NaN;
      return debt;
    } catch (error) {
      throw new BadRequestException(ERROR_SAVE_PAYMENT);
    }
  }

  async saveNewPayment(
    payment: payment,
  ): Promise<Payment | BadRequestException> {
    try {
      const savePayment = await this.prismaService.payment.create({
        data: payment,
      });
      if (savePayment) {
        return savePayment;
      }
      return new BadRequestException(
        `Error guardando en bd el pago con los siguientes datos: ${payment}`,
      );
    } catch (error) {
      throw new BadRequestException(ERROR_SAVE_PAYMENT);
    }
  }

  async getInstallmentLoan(loan_id: number): Promise<number> {
    try {
      const installment = await this.prismaService.loan.findUnique({
        where: {
          id: loan_id,
        },
        select: {
          installment: true,
        },
      });
      return Number(parseFloat(installment.installment.toString()).toFixed(2));
    } catch (error) {
      throw new BadRequestException(ERROR_SAVE_PAYMENT);
    }
  }

  async getLastPaymentMade(loan_id: number): Promise<number> {
    try {
      const lastPayment = await this.prismaService.payment.findMany({
        where: {
          loan_id: loan_id,
        },
        select: {
          debt: true,
        },
        orderBy: {
          id: 'desc',
        },
        take: 1,
      });
      return parseFloat(Number(lastPayment[0].debt).toFixed(2));
    } catch (error) {}
  }
}
