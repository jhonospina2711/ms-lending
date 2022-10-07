import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TransformInterceptor } from './core/interceptors/transform.interceptor';
import { LoanModule } from './loan/loan.module';
import { PaymentModule } from './payment/payment.module';
import { PrismaModule } from '../libs/prisma/src/prisma.module';
import { TargetModule } from './target/target.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    PrismaModule,
    TargetModule,
    LoanModule,
    PaymentModule,
  ],
  controllers: [],
  providers: [{ provide: APP_INTERCEPTOR, useClass: TransformInterceptor }],
})
export class AppModule {}
