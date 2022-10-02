import { BadRequestException, Injectable } from '@nestjs/common';
import { Loan, Target } from '@prisma/client';
import {
  ERROR_AMOUNT_LOAN,
  ERROR_AMOUNT_TOTAL,
  ERROR_GET_INSTALLMENT,
  ERROR_GET_TARGET_X_USER,
  ERROR_GET_USER,
  ERROR_LOAN_APPLICATION,
  ERROR_SAVE_LOAN,
} from 'src/common/constans/string';
import { success } from 'src/common/httpResponse.interface';
import { PrismaService } from 'src/prisma/prisma.service';
import { TargetService } from 'src/target/target.service';
import { loanApplicationDto } from './dtos/loanApplication.dto';

@Injectable()
export class LoanService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly targetService: TargetService,
  ) {}
  async loanApplication(payload: loanApplicationDto) {
    try {
      const { amount, term, user_id } = payload;
      const existUser = await this.validateUserExist(user_id);
      if (existUser === true) {
        const target = await this.getTargetToUser(user_id);
        const installment = await this.getInstallment(payload, target.rate);
        const loan = {
          user_id: user_id,
          amount: amount,
          term: term,
          installment: installment,
          date: new Date(),
          target_id: target.id,
          rate: target.rate,
        };
        if (amount <= parseInt(target.max.toString())) {
          const saveLoan = await this.saveNewLoan(loan);
          const response = {
            success: true,
            data: {
              loan_id: saveLoan['id'],
              installment: saveLoan['installment'],
            },
          };
          return success(response.data, response.success);
        }
        return new BadRequestException(
          `El prestamo supera el valor maximo permitido ${target.max}`,
        );
      }
      return new BadRequestException(
        `No existe usuario registrado con el id ${user_id}`,
      );
    } catch (error) {
      throw new BadRequestException(ERROR_LOAN_APPLICATION);
    }
  }

  async saveNewLoan(loan): Promise<Loan | BadRequestException> {
    try {
      const saveLoan = await this.prismaService.loan.create({
        data: loan,
      });
      if (saveLoan) {
        return saveLoan;
      }
      return new BadRequestException(
        `Error guardando en bd el prestamo con los siguientes datos: ${loan}`,
      );
    } catch (error) {
      throw new BadRequestException(ERROR_SAVE_LOAN);
    }
  }

  async getTargetToUser(user_id: number) {
    try {
      //TODO: suma la cantidad de prestamos por usuario en el ultimo año
      let amountLoan = await this.amountLoanBylatestYear(user_id);
      const amount_total = await this.amountTotalLoanBylatestYear(user_id);
      const dataNEW = await this.targetService.findOneTargetReturnAll('NEW');
      const dataFrequent = await this.targetService.findOneTargetReturnAll(
        'FREQUENT',
      );
      const dataPremium = await this.targetService.findOneTargetReturnAll(
        'PREMIUM',
      );
      if (amountLoan === 0) {
        amountLoan = 1;
        amount_total[0] = 0;
      }
      if (
        (amountLoan > dataNEW.min_cant && amountLoan < dataNEW.max_cant) ||
        amount_total[0] <= dataNEW.max_amount_total
      ) {
        return dataNEW;
      }
      if (
        (amountLoan >= dataFrequent.min_cant &&
          amountLoan < dataFrequent.max_cant) ||
        (amount_total[0] > dataFrequent.min_amount_total &&
          amount_total[0] < dataFrequent.max_amount_total)
      ) {
        return dataFrequent;
      }
      if (
        amountLoan >= dataPremium.min_cant ||
        amount_total[0] >= dataPremium.min_amount_total
      ) {
        return dataPremium;
      }
    } catch (error) {
      throw new BadRequestException(ERROR_GET_TARGET_X_USER);
    }
  }

  async amountTotalLoanBylatestYear(user_id: number): Promise<any[]> {
    try {
      const currentDate = new Date();
      const lastYear = new Date(
        currentDate.setFullYear(currentDate.getFullYear() - 1),
      );
      const amount_total = await this.prismaService.loan.findMany({
        where: {
          user_id: user_id,
          date: {
            lte: new Date(),
            gte: lastYear,
          },
        },
        select: {
          amount: true,
        },
      });
      let amount = [];
      let sum = 0;
      amount_total.map((item) => {
        if (amount[0] !== undefined) {
          sum = parseFloat(amount[0]) + parseFloat(item.amount.toString());
          amount = [];
          amount.push(sum);
        } else {
          amount.push(item.amount);
        }
      });
      return amount;
    } catch (error) {
      throw new BadRequestException(ERROR_AMOUNT_TOTAL);
    }
  }

  async amountLoanBylatestYear(user_id: number): Promise<number> {
    try {
      const currentDate = new Date();
      const lastYear = new Date(
        currentDate.setFullYear(currentDate.getFullYear() - 1),
      );
      const amountLoan = await this.prismaService.loan.count({
        where: {
          user_id: user_id,
          date: {
            lte: new Date(),
            gte: lastYear,
          },
        },
      });
      return amountLoan;
    } catch (error) {
      throw new BadRequestException(ERROR_AMOUNT_LOAN);
    }
  }

  async getInstallment(payload: loanApplicationDto, rate): Promise<number> {
    try {
      const { amount, term } = payload;
      const interesMV = parseFloat((rate / 12).toPrecision(3));
      // eslint-disable-next-line prettier/prettier
      const installment = parseFloat(
        (
          (interesMV + interesMV / ((1 + interesMV) ** term - 1)) *
          amount
        ).toPrecision(5),
      );
      return installment;
    } catch (error) {
      throw new BadRequestException(ERROR_GET_INSTALLMENT);
    }
  }

  async validateUserExist(user_id): Promise<boolean> {
    try {
      const document = await this.prismaService.user.findUnique({
        where: {
          id: user_id,
        },
        select: {
          document: true,
        },
      });
      if (document) {
        return true;
      }
      return false;
    } catch (error) {
      throw new BadRequestException(ERROR_GET_USER);
    }
  }

  async getListLoan(from: Date, to: Date) {
    try {
      // const lte = new Date(from).toISOString();
      // console.log(lte);
      // const gte = new Date(to).toISOString();
      // console.log(gte);

      const listLoan = await this.prismaService.loan.findMany({
        where: {
          date: {
            gte: new Date(from).toISOString(),
            lte: new Date(to).toISOString(),
          },
        },
        select: {
          id: true,
          amount: true,
          term: true,
          rate: true,
          user_id: true,
          relationTarget: {
            select: {
              name: true,
            },
          },
          date: true,
        },
      });
      let response = [];
      response = listLoan.map((data) => {
        const target = Object.assign({}, data);
        target['target'] = data.relationTarget.name;
        delete target.relationTarget;
        const date = new Date(target.date.setHours(target.date.getHours() - 5));
        delete target.date;
        target['date'] = date;
        return target;
      });
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
      throw new BadRequestException(ERROR_GET_INSTALLMENT);
    }
  }
}
