import { Module } from '@nestjs/common';
import { LoanService } from './loan.service';
import { LoanController } from './loan.controller';
import { TargetModule } from 'src/target/target.module';
import { PrismaModule } from '../../libs/prisma/src/prisma.module';

@Module({
  imports: [PrismaModule, TargetModule],
  providers: [LoanService],
  controllers: [LoanController],
  exports: [LoanService],
})
export class LoanModule {}
