import { Test, TestingModule } from '@nestjs/testing';
import { MultiTenantPrismaClientService } from './multi-tenant-prisma-client.service';

describe('MultiTenantPrismaClientService', () => {
  let service: MultiTenantPrismaClientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MultiTenantPrismaClientService],
    }).compile();

    service = module.get<MultiTenantPrismaClientService>(
      MultiTenantPrismaClientService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
