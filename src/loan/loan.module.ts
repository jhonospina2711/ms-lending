import { Module } from '@nestjs/common';
import { LoanService } from './loan.service';
import { LoanController } from './loan.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { TargetModule } from 'src/target/target.module';

@Module({
  imports: [PrismaModule, TargetModule],
  providers: [LoanService],
  controllers: [LoanController],
  exports: [LoanService],
})
export class LoanModule {}
