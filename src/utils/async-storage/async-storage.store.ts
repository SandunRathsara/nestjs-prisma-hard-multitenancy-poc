import { ClsStore } from 'nestjs-cls';

// Typed Cls Store to support type safety in ClsService
export interface AsyncStorageStore extends ClsStore {
  tenant: string;
}

// Store Keys
const TENANT: keyof AsyncStorageStore = 'tenant';

export const ASYNC_STORAGE_KEYS = {
  TENANT,
};
