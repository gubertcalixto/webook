export * from './accountServiceProxy';
import { AccountServiceProxy } from './accountServiceProxy';
export * from './userServiceProxy';
import { UserServiceProxy } from './userServiceProxy';
export const APIS = [AccountServiceProxy, UserServiceProxy];
