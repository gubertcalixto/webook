export * from './accountServiceProxy';
import { AccountServiceProxy } from './accountServiceProxy';
export * from './externalServiceProxy';
import { ExternalServiceProxy } from './externalServiceProxy';
export * from './userServiceProxy';
import { UserServiceProxy } from './userServiceProxy';
export const APIS = [AccountServiceProxy, ExternalServiceProxy, UserServiceProxy];
