import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CONFIGS } from '../../configs';
import { ConfigService } from '@nestjs/config';
import { AsyncStorageService } from '../async-storage/async-storage.module';

@Injectable()
export class MultiTenantPrismaClientService {
  private prisma: PrismaClient;

  constructor(
    private readonly configService: ConfigService,
    private readonly cls: AsyncStorageService,
  ) {
    this.prisma = new PrismaClient();
  }

  private changeDatabase(tenant: string) {
    this.prisma.$disconnect();
    this.prisma = new PrismaClient({
      datasources: {
        db: {
          url: this.configService
            .get<string>(CONFIGS.DATABASE_URL_MLTNT)
            .replace('tenant', tenant),
        },
      },
    });
  }
  getClient() {
    const { tenant } = this.cls.get();
    this.changeDatabase(tenant);
    return this.prisma;
  }
}
