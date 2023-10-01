import { Module } from '@nestjs/common';
import { ClsModule, ClsService } from 'nestjs-cls';
import { AsyncStorageStore } from './async-storage.store';
export class AsyncStorageService extends ClsService<AsyncStorageStore> {}

@Module({
  imports: [
    ClsModule.forRoot({
      global: true,
      middleware: { mount: true },
    }),
  ],
  providers: [
    {
      provide: AsyncStorageService,
      useExisting: ClsService,
    },
  ],
  exports: [AsyncStorageService],
})
export class AsyncStorageModule {}
