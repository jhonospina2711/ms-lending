import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { PrismaModule } from '../../libs/prisma/src/prisma.module';
import { LoanModule } from '../loan/loan.module';

@Module({
  imports: [PrismaModule, LoanModule],
  providers: [PaymentService],
  controllers: [PaymentController],
  //exports: [PaymentService],
})
export class PaymentModule {}
