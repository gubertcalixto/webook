import { environment } from './environment';

export const urlConsts = {
  authServerUrl: () => `${environment.authServerUrl}`,
  defaultRedirectUrl: () => `${environment.defaultRedirectUrl}`,
};
