import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { AsyncStorageService } from './async-storage.module';
import { ASYNC_STORAGE_KEYS } from './async-storage.store';

@Injectable()
export class AsyncStorageInterceptor implements NestInterceptor {
  constructor(private readonly cls: AsyncStorageService) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request: Request = context.switchToHttp().getRequest();

    this.cls.set(ASYNC_STORAGE_KEYS.TENANT, request.headers.tenant as string);
    return next.handle();
  }
}
