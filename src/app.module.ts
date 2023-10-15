import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InspectionModule } from './modules/inspection/inspection.module';
import { MultiTenantPrismaClientService } from './utils/multi-tenant/multi-tenant-prisma-client.service';
import { ConfigModule } from '@nestjs/config';
import { configs, validationSchema } from './configs';
import { AsyncStorageModule } from './utils/async-storage/async-storage.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AsyncStorageInterceptor } from './utils/async-storage/async-storage.interceptor';
import { CacheModule } from '@nestjs/cache-manager';
import { MultiTenantPgClientService } from './utils/multi-tenant/multi-tenant-pg-client.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configs],
      validationSchema,
      validationOptions: {
        allowUnknown: true,
        abortEarly: true,
      },
      isGlobal: true,
    }),
    AsyncStorageModule,
    InspectionModule,
    CacheModule.register({ isGlobal: true }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: AsyncStorageInterceptor,
    },
    MultiTenantPrismaClientService,
    MultiTenantPgClientService,
  ],
})
export class AppModule {}
