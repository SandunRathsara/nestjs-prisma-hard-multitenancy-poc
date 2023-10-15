import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CONFIGS } from '../../configs';
import { ConfigService } from '@nestjs/config';
import { AsyncStorageService } from '../async-storage/async-storage.module';
import { MultiTenantPgClientService } from './multi-tenant-pg-client.service';

@Injectable()
export class MultiTenantPrismaClientService {
  private prismas = new Map<string, PrismaClient>();
  constructor(
    private readonly configService: ConfigService,
    private readonly cls: AsyncStorageService,
    private readonly pgClientService: MultiTenantPgClientService,
  ) {}

  private async changeDatabase(tenant: string) {
    if (this.prismas.size < 1) {
      const tenants = await this.pgClientService.getTenants();
      for (const t of tenants) {
        this.prismas.set(
          t.code,
          new PrismaClient({
            datasources: {
              db: {
                url: this.configService
                  .get<string>(CONFIGS.DATABASE_URL_MLTNT)
                  .replace('tenant', tenant),
              },
            },
          }),
        );
      }
    }

    if (!this.prismas.has(tenant)) {
      const tenants = await this.pgClientService.getTenants();
      if (!tenants.map((t) => t.code).includes(tenant))
        throw new BadRequestException('Invalid Organization');

      this.prismas.set(
        tenant,
        new PrismaClient({
          datasources: {
            db: {
              url: this.configService
                .get<string>(CONFIGS.DATABASE_URL_MLTNT)
                .replace('tenant', tenant),
            },
          },
        }),
      );
    }

    return this.prismas.get(tenant);
  }

  terminatePrismaClients() {
    for (const prisma of this.prismas.values()) {
      prisma.$disconnect();
    }
  }

  getClient(): Promise<PrismaClient> {
    const { tenant } = this.cls.get();
    return this.changeDatabase(tenant);
  }
}
