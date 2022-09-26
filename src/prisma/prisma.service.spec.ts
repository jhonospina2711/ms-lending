import { Test, TestingModule } from '@nestjs/testing';
import { async } from 'rxjs';
import { PrismaService } from './prisma.service';

describe('PrismaService', () => {
  let service: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService],
    }).compile();

    service = module.get<PrismaService>(PrismaService);
  });


  it('should be defined onModuleInit', async () => {
    expect(service.onModuleInit).toBeTruthy();
  });
  it('should be defined onModuleDestroy', async () => {
    expect(service.onModuleDestroy).toBeTruthy();
  });

});
