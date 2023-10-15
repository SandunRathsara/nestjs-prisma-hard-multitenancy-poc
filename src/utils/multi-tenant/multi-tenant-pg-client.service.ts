import { Injectable, UseInterceptors } from '@nestjs/common';
import { Client } from 'pg';
import { AsyncStorageService } from '../async-storage/async-storage.module';
import {
  TenantTable,
  TenantTableSchema,
} from './constatns/tenant-table-schema';
import { CacheInterceptor, CacheKey } from '@nestjs/cache-manager';

@Injectable()
export class MultiTenantPgClientService {
  private readonly pg = new Client();

  constructor(private readonly cls: AsyncStorageService) {
    this.pg.connect();
  }

  @CacheKey('get_tenants')
  @UseInterceptors(CacheInterceptor)
  async getTenants(): Promise<TenantTable[]> {
    const tenants = await this.pg.query(
      `SELECT *
     FROM public.tenant`,
    );

    return tenants.rows
      .map((row: TenantTable) => {
        const validated = TenantTableSchema.validate(row || {});
        if (!validated.error && (validated.value as TenantTable).enabled)
          return validated.value as TenantTable;
        else return undefined;
      })
      .filter((item) => !!item);
  }
}
