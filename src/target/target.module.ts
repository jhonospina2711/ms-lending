import { Module } from '@nestjs/common';
import { TargetService } from './target.service';
import { TargetController } from './target.controller';
import { PrismaModule } from '../../libs/prisma/src/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [TargetService],
  controllers: [TargetController],
  exports: [TargetService],
})
export class TargetModule {}
