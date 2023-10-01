import { Module } from '@nestjs/common';
import { InspectionService } from './services/inspection.service';
import { InspectionController } from './controllers/inspection.controller';
import { MultiTenantPrismaClientService } from '../../utils/multi-tenant-prisma-client/multi-tenant-prisma-client.service';
import { AsyncStorageModule } from '../../utils/async-storage/async-storage.module';

@Module({
  imports: [AsyncStorageModule],
  controllers: [InspectionController],
  providers: [InspectionService, MultiTenantPrismaClientService],
})
export class InspectionModule {}
