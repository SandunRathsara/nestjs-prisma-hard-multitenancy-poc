import { Module } from '@nestjs/common';
import { InspectionService } from './services/inspection.service';
import { InspectionController } from './controllers/inspection.controller';
import { MultiTenantPrismaClientService } from '../../utils/multi-tenant/multi-tenant-prisma-client.service';
import { AsyncStorageModule } from '../../utils/async-storage/async-storage.module';
import { MultiTenantPgClientService } from '../../utils/multi-tenant/multi-tenant-pg-client.service';

@Module({
  imports: [AsyncStorageModule],
  controllers: [InspectionController],
  providers: [
    InspectionService,
    MultiTenantPrismaClientService,
    MultiTenantPgClientService,
  ],
})
export class InspectionModule {}
