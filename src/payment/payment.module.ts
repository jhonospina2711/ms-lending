import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { LoanModule } from '../loan/loan.module';

@Module({
  imports: [PrismaModule, LoanModule],
  providers: [PaymentService],
  controllers: [PaymentController],
  //exports: [PaymentService],
})
export class PaymentModule {}
