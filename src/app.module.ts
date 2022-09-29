import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TransformInterceptor } from './core/interceptors/transform.interceptor';
import { LoanModule } from './loan/loan.module';
import { PrismaModule } from './prisma/prisma.module';
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
  ],
  controllers: [],
  providers: [{ provide: APP_INTERCEPTOR, useClass: TransformInterceptor }],
})
export class AppModule {}
